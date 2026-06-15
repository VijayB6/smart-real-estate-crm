import React from "react";

function CameraCapture({ setImage }) {

  const handleImage = (e) => {

    setImage(
      e.target.files[0]
    );

  };

  return (
    <div>

      <input
        type="file"
        accept="image/*"
        capture="user"
        onChange={handleImage}
      />

    </div>
  );
}

export default CameraCapture;