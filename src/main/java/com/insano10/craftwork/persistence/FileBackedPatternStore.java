package com.insano10.craftwork.persistence;

import com.insano10.craftwork.domain.Pattern;
import org.apache.log4j.Logger;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;

public class FileBackedPatternStore implements PatternStore
{
    private static final Logger LOGGER = Logger.getLogger(FileBackedPatternStore.class);

    private final File patternFolder;

    public FileBackedPatternStore()
    {
        this.patternFolder = new File("patterns");
    }

    @Override
    public void save(String userId, final Pattern pattern)
    {
        //todo: change to using Paths and Files utilities
        System.out.println("File store saving pattern");

        final File userFolder = new File(patternFolder, userId);
        ensureFolderExists(patternFolder);
        ensureFolderExists(userFolder);

        final File patternFile = new File(userFolder, pattern.getTitle() + ".ptn");

        if(patternFile.exists())
        {
            LOGGER.info("Overwriting pattern file " + patternFile.getPath());
        }
        else
        {
            try
            {
                boolean patternFileCreated = patternFile.createNewFile();
                LOGGER.info("Pattern file " + patternFile.getPath() + " created: " + patternFileCreated);
            }
            catch (IOException e)
            {
                LOGGER.error("Failed to create file " + patternFile.getPath());
            }
        }

        try(PrintWriter writer = new PrintWriter(patternFile))
        {
            writer.println(pattern.getTitle());
            for(String instruction : pattern.getInstructions())
            {
                writer.println(instruction);
            }
            writer.flush();
        }
        catch (FileNotFoundException e)
        {
            e.printStackTrace();
        }

        LOGGER.info("File saved!");
    }

    private void ensureFolderExists(File folder)
    {
        if(!folder.exists())
        {
            boolean folderCreated = folder.mkdir();

            if(!folderCreated)
            {
                LOGGER.error("Failed to create folder " + folder.getPath());
            }
        }
    }
}
