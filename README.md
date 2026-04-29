# Info!
First of all, make sure you have [PathPlanner](https://github.com/mjansen4857/pathplanner/releases/) downloaded.
also if this doesn't work for you, I have absolutely no idea why as I have used this multiple times including in the middle of a competition and it's worked perfectly. Feel free to report to me what is going wrong though and I may be able to fix it!

## How to use
Hopefully this is easy enough to figure out how to use, but I can explain quick details anyway.
- Click on the file input button and select your ".path" file
- Click the "Process Path File"
- you have the option of checking the Mirror Vertically and/or Horizontally boxes
- click "Export Mirrored Path" if you'd like to download the mirrored path you are currently previewing
- click "Export All Mirrors" to download every possible mirror of the path you inputed.
- also, remember to put your newly downloaded files in the paths folder in your pathplanner project directory

if you are using the auto mirroring part, its a pretty similar process.

## Specifications (THIS IS PRETTY IMPORTANT)
The way the site calculates where the path is in the path mirrorer, (for the naming specifically) is that it detects which corner has a at least 50% of the line inside it.

Quick note about the auto mirrorer: This is EXTREMELY experimental and will not work on most autos. If you are using it and think MAYBE it will work, make sure the paths you are using with it are in the same corner and have already been exported from the path mirrorer (this literally just renames the paths in the auto file for you.)

If you want to use the auto mirrorer, make sure that you've already used the paths in the path mirrorer because literally the ONLY thing that the auto mirror does is rename the path names inside of it to have a prefix that fits the naming of the path mirror (for example, "TopRight New Auto").

The visualization of the path in the path mirrorer just visualizes the direct lines from the startpoint to endpoint of the path because the I cannot figure out how the curved lines are supposed to come out of the path file (its so weird. They calculate it somehow in the app and the curve values you put in there are just calculated to one single number in the path file.)

# well met!
Well, thats pretty much it, Have fun mirroring!
