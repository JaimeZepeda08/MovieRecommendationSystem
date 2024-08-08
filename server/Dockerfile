# Use Python 3.11 runtime as the base image
FROM python:3.11-slim

# Set the working directory inside the container to /server
WORKDIR /server

# Copy the current directory contents into the container at /server
COPY . /server

# Install any necessary dependencies specified in requirements.txt
# The --no-cache-dir flag prevents caching, reducing the image size
RUN pip install --no-cache-dir -r requirements.txt

# Expose port 5001 to allow access to the Flask app from outside the container
EXPOSE 5001

# Set environment variables for Flask
# FLASK_APP specifies the entry point for the Flask application
# FLASK_ENV is set to production for optimized performance
ENV FLASK_APP=server.py
ENV FLASK_ENV=production

# Command to run the Flask app, binding it to all network interfaces
CMD ["flask", "run", "--host=0.0.0.0"]
