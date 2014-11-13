package com.insano10.craftwork.domain;

import java.util.Arrays;

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

    public String getTitle()
    {
        return title;
    }

    public String[] getInstructions()
    {
        return instructions;
    }
}
