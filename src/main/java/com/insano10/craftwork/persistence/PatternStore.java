package com.insano10.craftwork.persistence;

import com.insano10.craftwork.domain.Pattern;

public interface PatternStore
{
    void save(String userId, Pattern pattern);

    Pattern create(String userId);

    Pattern loadLatest(String userId);
}
