export const downloadImage = async (url, filename) => {
     try {
          const response = await fetch(url);
          if (!response.ok) throw new Error('Network response was not ok');

          const blob = await response.blob();
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = filename;
          document.body.appendChild(link); // Append to body to make it work in Firefox
          link.click();
          document.body.removeChild(link); // Clean up
     } catch (error) {
          console.error('Error downloading the image:', error);
     }
};