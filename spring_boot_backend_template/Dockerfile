# Use a lightweight OpenJDK image
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file from your local machine to the container
COPY target/spring_boot_backend_template-0.0.1-SNAPSHOT.jar app.jar

# Expose the application port
EXPOSE 8081

# Command to run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]
