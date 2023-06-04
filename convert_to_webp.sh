#!/bin/bash

# The following script was written with ChatGPT

# Function to convert photos to WebP
convert_to_webp() {
    local file="$1"
    local output_file="${file%.*}.webp"

    # Check if the output file already exists
    if [[ -f "$output_file" ]]; then
        read -p "File $output_file already exists. Do you want to replace it? [y/n]: " choice
        if [[ "$choice" != "y" ]]; then
            echo "Skipping: $file"
            return
        fi
    fi

    # Convert the file to WebP using ImageMagick
    magick "$file" "$output_file"

    # Print the converted file path
    echo "Converted: $output_file"

    # Optional: Remove the original file (uncomment the line below if desired)
    # rm "$file"
}

# Function to traverse directories recursively
traverse_directory() {
    local dir="$1"

    # Loop through files and directories in the current directory
    for file in "$dir"/*; do
        if [[ -f "$file" ]]; then
            # Convert photos to WebP format
            if file --mime-type "$file" | grep -qE 'image/(jpeg|png)'; then
                convert_to_webp "$file"
            fi
        elif [[ -d "$file" ]]; then
            # Recursively call the function for subdirectories
            traverse_directory "$file"
        fi
    done
}

# Prompt the user to enter the directory path
read -p "Enter the directory path: " directory

# Start traversing the directory
traverse_directory "$directory"

