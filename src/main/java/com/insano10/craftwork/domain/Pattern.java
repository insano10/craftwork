package com.insano10.craftwork.domain;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

public class Pattern implements Comparable<Pattern>
{
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm dd/MM/yyyy");
    private static final String UNKNOWN_TITLE = "Untitled Pattern";

    private long id;
    private final String title;
    private final String[] instructions;
    private final LocalDateTime lastModified;
    private final String lastModifiedString;

    public Pattern(final long id, final String title, final String[] instructions, LocalDateTime lastModified)
    {
        this.id = id;
        this.title = title;
        this.instructions = instructions;
        this.lastModified = lastModified;
        this.lastModifiedString = DATE_TIME_FORMATTER.format(lastModified);
    }

    public static Pattern newPattern(final long id)
    {
        return new Pattern(id, UNKNOWN_TITLE, new String[0], LocalDateTime.now());
    }

    public static Pattern fromFileFormat(final List<String> lines, LocalDateTime lastModified)
    {
        List<String> instructions = lines.subList(2, lines.size());
        return new Pattern(Long.parseLong(lines.get(0)), lines.get(1), instructions.toArray(new String[instructions.size()]), lastModified);
    }

    public long getId()
    {
        return id;
    }

    public List<String> asFileFormat()
    {
        final List<String> lines = new ArrayList<>();

        lines.add(String.valueOf(id));
        lines.add(title);

        Arrays.asList(instructions).stream().
                filter((String s) -> !s.isEmpty()).
                forEach(lines::add);

        return lines;
    }

    @Override
    public boolean equals(Object o)
    {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Pattern pattern = (Pattern) o;

        if (id != pattern.id) return false;
        if (!Arrays.equals(instructions, pattern.instructions)) return false;
        if (!title.equals(pattern.title)) return false;

        return true;
    }

    @Override
    public int hashCode()
    {
        int result = (int) (id ^ (id >>> 32));
        result = 31 * result + title.hashCode();
        result = 31 * result + Arrays.hashCode(instructions);
        return result;
    }

    @Override
    public int compareTo(Pattern otherPattern)
    {
        return otherPattern.lastModified.compareTo(this.lastModified);
    }

    @Override
    public String toString()
    {
        return "Pattern{" +
                "id='" + id + '\'' +
                "title='" + title + '\'' +
                ", instructions=" + Arrays.toString(instructions) +
                ", lastModifiedString=" + lastModifiedString +
                '}';
    }
}
