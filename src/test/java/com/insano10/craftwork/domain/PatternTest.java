package com.insano10.craftwork.domain;

import org.junit.Test;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.Assert.*;

public class PatternTest
{
    private final LocalDateTime lastModified = LocalDateTime.of(2014, 12, 13, 15, 44);
    private final Pattern pattern = new Pattern(0L, "Title", new String[]{"line 1", "line 2", "line 3"}, lastModified);

    @Test
    public void shouldConvertToFileFormat() throws Exception
    {
        final List<String> fileFormatStrings = pattern.asFileFormat();

        assertEquals("0", fileFormatStrings.get(0));
        assertEquals("Title", fileFormatStrings.get(1));
        assertEquals("line 1", fileFormatStrings.get(2));
        assertEquals("line 2", fileFormatStrings.get(3));
        assertEquals("line 3", fileFormatStrings.get(4));
    }

    @Test
    public void shouldTrimEmptyLinesFromEndOfPatternWhenConvertingToFileFormat() throws Exception
    {
        final List<String> fileFormatStrings = new Pattern(0L, "Title", new String[]{"line 1", "", ""}, lastModified).asFileFormat();

        assertEquals("0", fileFormatStrings.get(0));
        assertEquals("Title", fileFormatStrings.get(1));
        assertEquals("line 1", fileFormatStrings.get(2));
        assertEquals("lines: " + fileFormatStrings, 3, fileFormatStrings.size());
    }

    @Test
    public void shouldConstructFromFileFormat() throws Exception
    {
        List<String> fileFormatStrings = Arrays.asList("0", "Title", "line 1", "line 2", "line 3");
        Pattern pattern = Pattern.fromFileFormat(fileFormatStrings, lastModified);

        assertEquals(this.pattern, pattern);
    }

    @Test
    public void shouldSortPatternsInOrderOfDescendingLastModifiedTime() throws Exception
    {
        final Pattern oldPattern = new Pattern(1L, "Title1", new String[]{"line 1", "line 2", "line 3"}, lastModified.minusMonths(1));
        final Pattern pattern = new Pattern(2L, "Title2", new String[]{"line 1", "line 2", "line 3"}, lastModified);
        final Pattern newPattern = new Pattern(3L, "Title3", new String[]{"line 1", "line 2", "line 3"}, lastModified.plusMonths(1));
        final List<Pattern> patternList = Arrays.asList(pattern, oldPattern, newPattern);

        assertEquals(pattern, patternList.get(0));
        assertEquals(oldPattern, patternList.get(1));
        assertEquals(newPattern, patternList.get(2));

        Collections.sort(patternList);

        assertEquals(newPattern, patternList.get(0));
        assertEquals(pattern, patternList.get(1));
        assertEquals(oldPattern, patternList.get(2));
    }
}