import React, { useRef, useEffect } from 'react';
import vipBase from '../../vip_base.jpg';

const TextOnImage = ({ text, number }) => {  // Now receiving text as a prop
  const canvasRef = useRef(null);

  // Draw the image and text on the canvas
  const drawImageWithText = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();

    image.onload = () => {
      // Set canvas size to match the image dimensions
      canvas.width = image.width;
      canvas.height = image.height;

      // Draw the image
      ctx.drawImage(image, 0, 0);

      // Add text on top of the image
      ctx.font = 'bold 250px Arial';  // Set a reasonable font size
      ctx.fillStyle = 'black';  // Text color
      ctx.textAlign = 'center';
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);  // Center text
      ctx.font = 'bold 450px Arial';  // Set a reasonable font size
      ctx.fillStyle = 'black';  // Text color
      ctx.textAlign = 'center';
      const paddedText = "#" + padText(number);
      ctx.fillText(paddedText, canvas.width - 1600, canvas.height - 160);  // Center text
    };

    image.src = vipBase;  // Set the image source (replace with your own image if needed)
  };

  // Redraw the image whenever the text changes
  useEffect(() => {
    drawImageWithText(); // Draw the image with text when the component mounts or text changes
  }, [text]);

   // Function to pad the text (number) to always have 3 digits
 const padText = (text) => {
    // If the text is a number, pad it to 3 digits, e.g., '37' => '037'
    return text.toString().padStart(3, '0');
  };

  // Handle download functionality
  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpeg', 0.8);
    link.download = `vip_pass_${number}.png`;
    link.click();
  };

  return (
    <div>
      {/* Canvas to display the result */}
      <br></br>
      <canvas
        ref={canvasRef}
        style={{
          border: '1px solid black',
          width: '100%',  // Control the display width of the image
          height: 'auto',  // Adjust height automatically to maintain aspect ratio
        }}
      />

      {/* Button to download the image */}
<br/>
<br/>
      <button type="submit" className='submit' onClick={handleDownload} style={{width: '100%'}}>
                    <b>Download Pass</b>
                </button>
    </div>
  );
};

export default TextOnImage;
