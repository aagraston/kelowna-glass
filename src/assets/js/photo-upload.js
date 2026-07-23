const photoInputs = document.querySelectorAll("[data-photo-upload]");

const allowedPhotoTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif"
];

const maxCombinedFileSize = 8 * 1024 * 1024;

photoInputs.forEach((input, index) => {
  input.addEventListener("change", () => {
    const selectedFile = input.files[0];

    if (!selectedFile) {
      hideFollowingInputs(index);
      return;
    }

    if (!allowedPhotoTypes.includes(selectedFile.type)) {
      alert("Please upload a JPG, PNG, WebP, or GIF image.");
      input.value = "";
      hideFollowingInputs(index);
      return;
    }

    if (getCombinedFileSize() > maxCombinedFileSize) {
      alert("The combined size of your photos must be less than 7 MB.");
      input.value = "";
      hideFollowingInputs(index);
      return;
    }

    revealNextInput(index);
  });
});

function revealNextInput(currentIndex) {
  const nextInput = photoInputs[currentIndex + 1];

  if (!nextInput) {
    return;
  }

  const nextWrapper = nextInput.closest("[data-photo-wrapper]");

  nextWrapper.classList.remove("hidden");
  nextInput.disabled = false;
}

function hideFollowingInputs(currentIndex) {
  photoInputs.forEach((input, index) => {
    if (index <= currentIndex) {
      return;
    }

    const wrapper = input.closest("[data-photo-wrapper]");

    input.value = "";
    input.disabled = true;
    wrapper.classList.add("hidden");
  });
}

function getCombinedFileSize() {
  return Array.from(photoInputs).reduce((totalSize, input) => {
    const file = input.files[0];

    return totalSize + (file ? file.size : 0);
  }, 0);
}