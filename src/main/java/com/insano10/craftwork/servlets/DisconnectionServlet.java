package com.insano10.craftwork.servlets;

import com.google.api.client.auth.oauth2.TokenResponseException;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.GenericUrl;
import com.google.api.client.http.HttpResponse;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

public class DisconnectionServlet extends HttpServlet
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
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException
    {
        response.setContentType("application/json");

        // Only disconnect a connected user.
        String tokenData = (String) request.getSession().getAttribute("token");
        if (tokenData == null)
        {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().print(GSON.toJson("Current user not connected."));
            return;
        }

        try
        {
            // Build credential from stored token data.
            GoogleCredential credential = new GoogleCredential.Builder()
                    .setJsonFactory(JSON_FACTORY)
                    .setTransport(TRANSPORT)
                    .setClientSecrets(CLIENT_ID, CLIENT_SECRET).build()
                    .setFromTokenResponse(JSON_FACTORY.fromString(
                            tokenData, GoogleTokenResponse.class));

            // Execute HTTP GET request to revoke current token.
            GenericUrl revokeUrl = new GenericUrl(String.format("https://accounts.google.com/o/oauth2/revoke?token=%s", credential.getAccessToken()));
            TRANSPORT.createRequestFactory().buildGetRequest(revokeUrl).execute();

            // Reset the user's session.
            request.getSession().removeAttribute("token");
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().print(GSON.toJson("Successfully disconnected."));
        }
        catch (IOException e)
        {
            // For whatever reason, the given token was invalid.
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().print(GSON.toJson("Failed to revoke token for given user."));
        }
    }

}
