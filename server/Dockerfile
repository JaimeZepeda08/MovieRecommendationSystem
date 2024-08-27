# Use Python 3.11 runtime as the base image
FROM python:3.11-slim

# Set the working directory inside the container to /server
WORKDIR /server

# Copy the current directory contents into the container at /server
COPY . /server

# Install necessary dependencies and Gunicorn
RUN pip install --no-cache-dir -r requirements.txt && \
    pip install --no-cache-dir gunicorn

# Expose port 5001 to allow access to the Flask app from outside the container
EXPOSE 5001

# Run the Flask app with Gunicorn
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5001", "server:app"]
