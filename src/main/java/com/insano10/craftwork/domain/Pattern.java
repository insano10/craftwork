package com.insano10.craftwork.domain;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class Pattern
{
    private final String title;
    private final String[] instructions;

    public Pattern(final String title, final String[] instructions)
    {
        this.title = title;
        this.instructions = instructions;
    }

    @Override
    public String toString()
    {
        return "Pattern{" +
                "title='" + title + '\'' +
                ", instructions=" + Arrays.toString(instructions) +
                '}';
    }

    public String getId()
    {
        return title;
    }

    public Iterable<String> asFileFormat()
    {
        final List<String> lines = new ArrayList<>();

        lines.add(title);
        Collections.addAll(lines, instructions);

        return lines;
    }
}
