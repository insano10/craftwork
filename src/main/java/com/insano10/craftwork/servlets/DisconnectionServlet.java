package com.insano10.craftwork.servlets;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.GenericUrl;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class DisconnectionServlet extends HttpServlet
{
    private static final String TOKEN_ATTRIBUTE_ID = "token";
    private static final Gson GSON = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException
    {
        response.setContentType("application/json");

        // Only disconnect a connected user.
        String tokenData = (String) request.getSession().getAttribute(TOKEN_ATTRIBUTE_ID);
        if (tokenData == null)
        {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().print(GSON.toJson("Current user not connected."));
            return;
        }

        // Reset the user's session.
        request.getSession().removeAttribute(TOKEN_ATTRIBUTE_ID);
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().print(GSON.toJson("Successfully disconnected."));
    }
}
