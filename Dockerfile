# Use the official Python image as base
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Copy only requirements.txt first to leverage Docker caching
COPY requirements.txt .

# Install any dependencies specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project directory into the container at /app
COPY . .

# Expose port 5000 to allow communication to/from server
EXPOSE 5000

# Specify a user to run the application, for security reasons
# RUN adduser --disabled-password myuser && chown -R myuser /app
# USER myuser

# Command to run the Flask application
CMD ["python", "app.py"]