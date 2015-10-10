package com.insano10.craftwork.servlets;

import com.google.api.client.auth.oauth2.TokenResponseException;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.gson.Gson;
import com.insano10.craftwork.security.AuthTokenVerifier;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.security.GeneralSecurityException;
import java.util.Arrays;

public class ConnectionServlet extends HttpServlet
{
    private static final AuthTokenVerifier TOKEN_VERIFIER = new AuthTokenVerifier();
    private static final Gson GSON = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        response.setContentType("application/json");

        // Only connect a user that is not already connected.
        String tokenData = (String) request.getSession().getAttribute("token");
        if (tokenData != null)
        {
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().print(GSON.toJson("Current user is already connected."));
            return;
        }

        //Get the token ID generated from the google auth server stored in the request
        ByteArrayOutputStream resultStream = new ByteArrayOutputStream();
        getContent(request.getInputStream(), resultStream);
        String tokenId = new String(resultStream.toByteArray(), "UTF-8");

        try
        {
            GoogleIdToken idToken = TOKEN_VERIFIER.verifyTokenId(tokenId);
            if (idToken != null)
            {
                // Store the token in the session for later use.
                request.getSession().setAttribute("token", tokenId);
                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().print(GSON.toJson("Successfully connected user."));
            }
            else
            {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().print(GSON.toJson("Invalid ID Token"));
            }
        }
        catch (GeneralSecurityException e)
        {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().print(GSON.toJson("Failed to verify authorisation token " + e.getMessage()));
        }
    }

    private static void getContent(InputStream inputStream, ByteArrayOutputStream outputStream) throws IOException
    {
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
        int readChar;
        while ((readChar = reader.read()) != -1)
        {
            outputStream.write(readChar);
        }
        reader.close();
    }
}
