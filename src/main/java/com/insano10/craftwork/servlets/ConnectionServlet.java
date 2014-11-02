package com.insano10.craftwork.servlets;

import com.google.api.client.auth.oauth2.TokenResponseException;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

public class ConnectionServlet extends HttpServlet
{
    private static final String CLIENT_ID = "167961214562-grbr91oci2183eqd580k8r7vvfsqmvsi.apps.googleusercontent.com";
    private static final String CLIENT_SECRET = "tIeDGRBziwoAEdfhfdAZ1kE6";

    private static final HttpTransport TRANSPORT = new NetHttpTransport();
    private static final JacksonFactory JSON_FACTORY = new JacksonFactory();
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

        //Get the auth code generated from the google auth server stored in the request
        ByteArrayOutputStream resultStream = new ByteArrayOutputStream();
        getContent(request.getInputStream(), resultStream);
        String code = new String(resultStream.toByteArray(), "UTF-8");

        try
        {
            // Upgrade the authorization code into an access and refresh token.
            GoogleTokenResponse tokenResponse = new GoogleAuthorizationCodeTokenRequest(TRANSPORT, JSON_FACTORY, CLIENT_ID, CLIENT_SECRET, code, "postmessage").execute();

            // Store the token in the session for later use.
            request.getSession().setAttribute("token", tokenResponse.toString());
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().print(GSON.toJson("Successfully connected user."));
        } catch (TokenResponseException e)
        {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().print(GSON.toJson("Failed to upgrade the authorization code."));
        } catch (IOException e)
        {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().print(GSON.toJson("Failed to read token data from Google. " +
                    e.getMessage()));
        }
    }

    static void getContent(InputStream inputStream, ByteArrayOutputStream outputStream)
            throws IOException
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
