# Pearfect - Pear Variety and Harvest Tracker

Welcome to Pearfect, a full-stack application for pear enthusiasts and growers. This application allows users to browse a catalog of pear varieties and log their personal harvests.

This project is built using React for the frontend and **Manifest** for the entire backend, showcasing a modern, backend-as-a-service approach.

## Features

- **User Authentication**: Secure login for users (farmers) powered by Manifest's built-in authentication.
- **Admin Panel**: A complete, auto-generated admin interface at `/admin` for managing all data.
- **Pear Variety Catalog**: View a list of pear varieties with images, descriptions, and flavor profiles.
- **Harvest Logging**: Authenticated users can create, view, and delete their own harvest records.
- **Ownership Policies**: Farmers can only access and manage their own harvest data, ensured by Manifest's access policies.
- **File Uploads**: Pear variety images are handled by Manifest's file storage system.

## Tech Stack

- **Backend**: Manifest (YAML-based configuration)
- **Frontend**: React, Vite, Tailwind CSS
- **SDK**: `@mnfst/sdk` for all frontend-backend communication

## Getting Started

Follow the `setupGuide.md` for detailed instructions on how to run this project locally.
