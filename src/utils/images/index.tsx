export const compressImage = (e: any, onCompresResult: (file: File, result: any) => void) => {
    let width = 950;
    const file = e.target.files[0];
    const fileName = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
            const elem = document.createElement("canvas");
            if (img.width < width) {
                width = img.width;
            }
            const scaleFactor = width / img.width;
            console.log("WIDTH: ", width, scaleFactor);
            elem.width = width;
            elem.height = img.height * scaleFactor;
            const ctx: any = elem.getContext("2d");
            ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
            ctx.canvas.toBlob(
                (blob: any) => {
                    const fileResult = new File([blob], fileName, { type: file.type, lastModified: Date.now() });
                    onCompresResult(fileResult, event.target.result);
                },
                file.type,
                0.8
            );
        };
    };
    reader.onerror = (error: any) => console.log(error);
};

export const getFormDataImage = (imageFile: any, modelId: string) => {
    const formData = new FormData();
    formData.append("id", modelId);
    formData.append("files", imageFile);
    return formData;
};
