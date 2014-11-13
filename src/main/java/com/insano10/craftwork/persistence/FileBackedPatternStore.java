package com.insano10.craftwork.persistence;

import com.insano10.craftwork.domain.Pattern;
import org.apache.log4j.Logger;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

public class FileBackedPatternStore implements PatternStore
{
    private static final Logger LOGGER = Logger.getLogger(FileBackedPatternStore.class);
    private static final String PATTERN_FOLDER = "patterns";

    @Override
    public void save(String userId, final Pattern pattern)
    {
        try
        {
            Files.createDirectories(Paths.get(PATTERN_FOLDER, userId));
            Path patternFile = Paths.get(PATTERN_FOLDER, userId, pattern.getId().concat(".ptn"));
            Files.write(patternFile, pattern.asFileFormat(), StandardOpenOption.CREATE);

            LOGGER.info("Pattern saved: " + patternFile.toString());
        }
        catch(IOException e)
        {
            LOGGER.error("Error saving pattern " + pattern.toString(), e);
        }
    }

}
