package com.insano10.craftwork.persistence;

import com.insano10.craftwork.domain.Pattern;
import org.apache.log4j.Logger;

import java.io.IOException;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;
import java.nio.file.attribute.FileTime;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
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
            Files.write(patternFile, pattern.asFileFormat(), StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);

            LOGGER.info("Pattern saved: " + patternFile.toString());
        }
        catch (IOException e)
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

    @Override
    public Pattern loadLatest(String userId)
    {
        ensureUserDirectoryExists(userId);

        try (DirectoryStream<Path> directoryStream = Files.newDirectoryStream(Paths.get(PATTERN_FOLDER, userId)))
        {
            FileTime latestPatternTime = null;
            Path latestPattern = null;
            for (Path file : directoryStream)
            {
                BasicFileAttributes attributes = Files.readAttributes(file, BasicFileAttributes.class);
                FileTime modifiedTime = attributes.lastModifiedTime();

                if(latestPatternTime == null || modifiedTime.compareTo(latestPatternTime) > 0)
                {
                    latestPatternTime = modifiedTime;
                    latestPattern = file;
                }
            }

            if(latestPattern != null)
            {
                List<String> patternLines = Files.readAllLines(latestPattern);
                return Pattern.fromFileFormat(patternLines, getFileLastModifiedTime(latestPattern));
            }
        }
        catch (IOException e)
        {
            LOGGER.error("Failed to read user patterns: " + userId, e);
        }
        return null;
    }

    @Override
    public Collection<Pattern> loadPatterns(String userId)
    {
        ensureUserDirectoryExists(userId);

        final List<Pattern> patterns = new ArrayList<>();

        try (DirectoryStream<Path> directoryStream = Files.newDirectoryStream(Paths.get(PATTERN_FOLDER, userId)))
        {
            for (final Path file : directoryStream)
            {
                List<String> patternLines = Files.readAllLines(file);
                patterns.add(Pattern.fromFileFormat(patternLines, getFileLastModifiedTime(file)));
            }
        }
        catch (IOException e)
        {
            LOGGER.error("Failed to read user patterns: " + userId, e);
        }

        Collections.sort(patterns);

        return patterns;
    }

    @Override
    public Pattern loadPattern(String userId, String patternId)
    {
        ensureUserDirectoryExists(userId);

        try
        {
            Path patternFile = Paths.get(PATTERN_FOLDER, userId, patternId + ".ptn");
            List<String> patternLines = Files.readAllLines(patternFile);
            return Pattern.fromFileFormat(patternLines, getFileLastModifiedTime(patternFile));
        }
        catch (IOException e)
        {
            LOGGER.error("Failed to load user pattern: " + patternId);
        }
        return null;
    }

    @Override
    public void deletePattern(String userId, int patternId)
    {
        ensureUserDirectoryExists(userId);

        try
        {
            LOGGER.info("Deleting pattern: " + patternId);
            Path patternFile = Paths.get(PATTERN_FOLDER, userId, patternId + ".ptn");
            Files.delete(patternFile);
        }
        catch (IOException e)
        {
            LOGGER.error("Failed to delete user pattern: " + patternId);
        }
    }

    private AtomicLong createUserSequence(final String key)
    {
        return new AtomicLong(0);
    }

    private LocalDateTime getFileLastModifiedTime(final Path path) throws IOException
    {
        BasicFileAttributes attributes = Files.readAttributes(path, BasicFileAttributes.class);
        return LocalDateTime.ofInstant(attributes.lastModifiedTime().toInstant(), ZoneId.systemDefault());
    }

    private void ensureUserDirectoryExists(String userId)
    {
        try
        {
            Files.createDirectories(Paths.get(PATTERN_FOLDER, userId));
        }
        catch (IOException e)
        {
            LOGGER.error("Failed to create user directory", e);
        }
    }

}
