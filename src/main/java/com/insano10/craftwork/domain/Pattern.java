package com.insano10.craftwork.domain;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class Pattern
{
    private static final String UNKNOWN_TITLE = "Untitled Pattern";

    private long id;
    private final String title;
    private final String[] instructions;

    public Pattern(final long id, final String title, final String[] instructions)
    {
        this.id = id;
        this.title = title;
        this.instructions = instructions;
    }

    public static Pattern newPattern(final long id)
    {
        return new Pattern(id, UNKNOWN_TITLE, new String[0]);
    }

    @Override
    public String toString()
    {
        return "Pattern{" +
                "id='" + id + '\'' +
                "title='" + title + '\'' +
                ", instructions=" + Arrays.toString(instructions) +
                '}';
    }

    public long getId()
    {
        return id;
    }

    public Iterable<String> asFileFormat()
    {
        final List<String> lines = new ArrayList<>();

        lines.add(String.valueOf(id));
        lines.add(title);
        Collections.addAll(lines, instructions);

        return lines;
    }

    public static Pattern fromFileFormat(final List<String> lines)
    {
        List<String> instructions = lines.subList(2, lines.size());
        return new Pattern(Long.parseLong(lines.get(0)), lines.get(1), instructions.toArray(new String[instructions.size()]));
    }
}
