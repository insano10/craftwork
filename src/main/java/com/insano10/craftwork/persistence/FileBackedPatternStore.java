package com.insano10.craftwork.persistence;

import com.insano10.craftwork.domain.Pattern;
import org.apache.log4j.Logger;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

public class FileBackedPatternStore implements PatternStore
{
    private static final Logger LOGGER = Logger.getLogger(FileBackedPatternStore.class);
    private static final String PATTERN_FOLDER = "patterns";

    private final Map<String, AtomicLong> userSequences = new ConcurrentHashMap<>();

    @Override
    public void save(String userId, final Pattern pattern)
    {
        try
        {
            Files.createDirectories(Paths.get(PATTERN_FOLDER, userId));
            Path patternFile = Paths.get(PATTERN_FOLDER, userId, String.valueOf(pattern.getId()).concat(".ptn"));
            Files.write(patternFile, pattern.asFileFormat(), StandardOpenOption.CREATE);

            LOGGER.info("Pattern saved: " + patternFile.toString());
        }
        catch(IOException e)
        {
            LOGGER.error("Error saving pattern " + pattern.toString(), e);
        }
    }

    @Override
    public Pattern create(String userId)
    {
        AtomicLong sequence = userSequences.computeIfAbsent(userId, this::createUserSequence);

        Pattern newPattern = Pattern.newPattern(sequence.incrementAndGet());
        save(userId, newPattern);

        return newPattern;
    }

    private AtomicLong createUserSequence(final String key)
    {
        return new AtomicLong(0);
    }

}
