# **PDFCollabrate**

A brief description of how can you start this project.

---

## **Authors**

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://shubham09anand.in/)  
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/subham09anand/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)  
[![instagram](https://img.shields.io/badge/instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/shubham09anand/?igsh=YTJvZDZlZmNwYWY1)  
[![docker](https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://hub.docker.com/u/shubham09anand)


---

## 🔗 Links

<p>
  <img src="https://pdfcollaborator.shubham09anand.in/static/media/pdfLogo.66708f8254c233d11a29.jpg" style="height: 50px; width: 50px; margin-right: 10px;" />
  <b>PDFCollabrate</b>: <a href="https://pdfcollaborator.shubham09anand.in/">https://pdfcollaborator.shubham09anand.in/</a>
</p>


---

## **Deployment**

To deploy this project, follow these instructions:

### **Setup Instructions**
#### Prerequisites
1. **Install Docker**: Ensure Docker is installed on your system. You can download it from Docker’s official website.  
2. **Install Docker Compose**: Docker Compose is typically bundled with Docker Desktop. Confirm it’s installed by running:
   ```bash
   docker-compose --version
   ```

---

## **Instructions**

### Create a `docker-compose.yml` File:
In your project directory, create a file named `docker-compose.yml` and add the following configuration:

```yaml
version: '3.8'

services:
  pdf_editor_backend:
    image: shubham09anand/pdf_editor_backend:latest
    container_name: pdf_editor_backend_container
    ports:
      - '8080:8080'
    networks:
      - pdfeditor_network

  pdf_editor_frontend:
    image: shubham09anand/pdf_editor_frontend:latest
    container_name: pdf_editor_frontend_container
    ports:
      - '3000:3000'
    networks:
      - pdfeditor_network

networks:
  pdfeditor_network:
    driver: bridge
```

---

### Run Docker Compose:
1. Open a terminal in the directory containing your `docker-compose.yml` file.  
2. Run the following command to build and start the services:
   ```bash
   docker-compose up -d
   ```
   - The `-d` flag runs the services in detached mode, so they continue running in the background.

Docker Compose will download the images, create containers, and start the application.

---

### **Access the Application**

Once ```bash
docker-compose up -d
   ``` executed succesfull access the application

- **Frontend**: Visit [http://127.0.0.1:3000](http://127.0.0.1:3000) in your browser.  
- **Backend**: Access [http://127.0.0.1:8080](http://127.0.0.1:8080) to interact with the backend.

---