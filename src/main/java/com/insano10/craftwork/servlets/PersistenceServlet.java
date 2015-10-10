package com.insano10.craftwork.servlets;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.gson.Gson;
import com.insano10.craftwork.domain.Pattern;
import com.insano10.craftwork.persistence.FileBackedPatternStore;
import com.insano10.craftwork.persistence.PatternStore;
import com.insano10.craftwork.security.AuthTokenVerifier;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collection;

public class PersistenceServlet extends HttpServlet
{
    private static final AuthTokenVerifier TOKEN_VERIFIER = new AuthTokenVerifier();
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

            try
            {
                GoogleIdToken googleIdToken = getGoogleIdToken(tokenData);
                String userId = googleIdToken.getPayload().getSubject();

                Collection<Pattern> patterns = patternStore.loadPatterns(userId);
                response.getWriter().print(GSON.toJson(patterns));
                response.setStatus(HttpServletResponse.SC_OK);
            }
            catch (GeneralSecurityException e)
            {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                response.getWriter().print(GSON.toJson("Failed to authorise user token"));
            }
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

        try
        {
            GoogleIdToken googleIdToken = getGoogleIdToken(tokenData);
            String userId = googleIdToken.getPayload().getSubject();

            if(request.getRequestURI().endsWith("/create"))
            {
                Pattern pattern = patternStore.create(userId);

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
                    pattern = patternStore.loadLatest(userId);
                }
                else
                {
                    pattern = patternStore.loadPattern(userId, patternId);
                }

                response.getWriter().print(GSON.toJson(pattern));
                response.setStatus(HttpServletResponse.SC_OK);
            }
            else if(request.getRequestURI().endsWith("/save"))
            {
                Pattern pattern = GSON.fromJson(request.getParameter("pattern"), Pattern.class);
                patternStore.save(userId, pattern);

                response.setStatus(HttpServletResponse.SC_OK);
            }
            else if(request.getRequestURI().endsWith("/delete"))
            {
                int patternId = Integer.parseInt(request.getParameter("id"));
                patternStore.deletePattern(userId, patternId);

                response.setStatus(HttpServletResponse.SC_OK);
            }
            else
            {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            }
        }
        catch (GeneralSecurityException e)
        {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().print(GSON.toJson("Failed to authorise user token"));
        }
    }

    private GoogleIdToken getGoogleIdToken(final String authTokenId) throws GeneralSecurityException, IOException
    {
        return TOKEN_VERIFIER.verifyTokenId(authTokenId);
    }

}
