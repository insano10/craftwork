package com.insano10.craftwork.persistence;

import com.insano10.craftwork.domain.Pattern;

import java.util.Collection;

public interface PatternStore
{
    void save(String userId, Pattern pattern);

    Pattern create(String userId);

    Pattern loadLatest(String userId);

    Collection<Pattern> loadPatterns(String userId);

    Pattern loadPattern(String userId, String patternId);
}
