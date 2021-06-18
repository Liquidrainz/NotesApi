# NotesApi

This is a simple app that has 3 parts to it.

1)  There's a REST API storing notes into memory.
2)  The web app has swagger enabled to see REST API documentation.
3)  When the app runs, it opens the main page where you can see the REST API in action through the web interface.

      • Get notes
      • Get a note
      • Add a note
      • Delete a note
      • Update a note

Running the application:

You will need to clone the repo to your machine, I used Visual Studio for Windows.

Here are all the options I tested to run the project:

1)  IIS Express
2)  Docker as long as the docker-compose project is the start up project and it's configured on your machine.
3)  WSL if you have it configured on your machine.
4)  Command line in the project folder: dotnet run --project NotesApi.csproj
5)  Visual Studio Code using .Net Core Launcher.
