package com.insano10.craftwork.security;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.insano10.craftwork.servlets.ClientApp;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Arrays;

public class AuthTokenVerifier
{
    private static final HttpTransport TRANSPORT = new NetHttpTransport();
    private static final JacksonFactory JSON_FACTORY = new JacksonFactory();

    private static final GoogleIdTokenVerifier TOKEN_ID_VERIFIER = new GoogleIdTokenVerifier
            .Builder(TRANSPORT, JSON_FACTORY)
            .setAudience(Arrays.asList(ClientApp.CLIENT_ID))
            .build();

    public GoogleIdToken verifyTokenId(final String tokenId) throws GeneralSecurityException, IOException
    {
        return TOKEN_ID_VERIFIER.verify(tokenId);
    }

}
