package com.insano10.craftwork.servlets;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.plus.Plus;
import com.google.api.services.plus.model.Person;
import com.google.gson.Gson;
import com.insano10.craftwork.domain.Pattern;
import com.insano10.craftwork.persistence.FileBackedPatternStore;
import com.insano10.craftwork.persistence.PatternStore;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;

public class PersistenceServlet extends HttpServlet
{
    private static final HttpTransport TRANSPORT = new NetHttpTransport();
    private static final JacksonFactory JSON_FACTORY = new JacksonFactory();
    private static final Gson GSON = new Gson();

    private final PatternStore patternStore = new FileBackedPatternStore();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        if(request.getRequestURI().endsWith("/patterns"))
        {
            String tokenData = (String) request.getSession().getAttribute("token");
            if (tokenData == null)
            {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().print(GSON.toJson("User is not logged in"));
                return;
            }

            Person user = getUserFromToken(tokenData);

            Collection<Pattern> patterns = patternStore.loadPatterns(user.getId());
            response.getWriter().print(GSON.toJson(patterns));
            response.setStatus(HttpServletResponse.SC_OK);
        }
        else
        {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        String tokenData = (String) request.getSession().getAttribute("token");
        if (tokenData == null)
        {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().print(GSON.toJson("User is not logged in"));
            return;
        }

        Person user = getUserFromToken(tokenData);
        System.out.println("User: " + user.getName());

        if(request.getRequestURI().endsWith("/create"))
        {
            Pattern pattern = patternStore.create(user.getId());

            response.getWriter().print(GSON.toJson(pattern));
            response.setStatus(HttpServletResponse.SC_OK);
        }
        else if(request.getRequestURI().endsWith("/load"))
        {
            final String patternId = request.getParameter("patternId");

            final  Pattern pattern;
            //todo: replace this hack by putting id in url. e.g. /load/123
            if(patternId.isEmpty() || patternId.equals("null"))
            {
                pattern = patternStore.loadLatest(user.getId());
            }
            else
            {
                pattern = patternStore.loadPattern(user.getId(), patternId);
            }

            response.getWriter().print(GSON.toJson(pattern));
            response.setStatus(HttpServletResponse.SC_OK);
        }
        else if(request.getRequestURI().endsWith("/save"))
        {
            Pattern pattern = GSON.fromJson(request.getParameter("pattern"), Pattern.class);
            patternStore.save(user.getId(), pattern);

            response.setStatus(HttpServletResponse.SC_OK);
        }
        else if(request.getRequestURI().endsWith("/delete"))
        {
            int patternId = Integer.parseInt(request.getParameter("id"));
            patternStore.deletePattern(user.getId(), patternId);

            response.setStatus(HttpServletResponse.SC_OK);
        }
        else
        {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
    }

    private Person getUserFromToken(final String token) throws IOException
    {
        GoogleCredential credential = new GoogleCredential.Builder()
                .setJsonFactory(JSON_FACTORY)
                .setTransport(TRANSPORT)
                .setClientSecrets(ClientApp.CLIENT_ID, ClientApp.CLIENT_SECRET).build()
                .setFromTokenResponse(JSON_FACTORY.fromString(token, GoogleTokenResponse.class));

        Plus service = new Plus.Builder(TRANSPORT, JSON_FACTORY, credential)
                .setApplicationName(ClientApp.APPLICATION_NAME)
                .build();

        return service.people().get("me").execute();
    }

}
