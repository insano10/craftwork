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
import java.util.Arrays;

public class PersistenceServlet extends HttpServlet
{
    private static final HttpTransport TRANSPORT = new NetHttpTransport();
    private static final JacksonFactory JSON_FACTORY = new JacksonFactory();
    private static final Gson GSON = new Gson();

    private final PatternStore patternStore = new FileBackedPatternStore();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {

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

        GoogleCredential credential = new GoogleCredential.Builder()
                .setJsonFactory(JSON_FACTORY)
                .setTransport(TRANSPORT)
                .setClientSecrets(ClientApp.CLIENT_ID, ClientApp.CLIENT_SECRET).build()
                .setFromTokenResponse(JSON_FACTORY.fromString(tokenData, GoogleTokenResponse.class));
        // Create a new authorized API client.
        Plus service = new Plus.Builder(TRANSPORT, JSON_FACTORY, credential)
                .setApplicationName(ClientApp.APPLICATION_NAME)
                .build();

        Person user = service.people().get("me").execute();
        System.out.println("User: " + user.getName());

        //Get the instructions to be saved
        String title = GSON.fromJson(request.getParameter("title"), String.class);
        String[] instructionArray = GSON.fromJson(request.getParameter("instructions"), String[].class);
        Pattern pattern = new Pattern(title, instructionArray); //todo: just send a pattern across json
        System.out.println(pattern);

        patternStore.save(user.getId(), pattern);

        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().print(GSON.toJson("Saved"));
    }

}
