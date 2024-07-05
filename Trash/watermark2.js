const {
     ServicePrincipalCredentials,
     PDFServices,
     MimeType,
     ExportPDFToImagesJob,
     ExportPDFToImagesTargetFormat,
     ExportPDFToImagesOutputType,
     ExportPDFToImagesParams,
     ExportPDFToImagesResult,
     SDKError,
     ServiceUsageError,
     ServiceApiError
 } = require("@adobe/pdfservices-node-sdk");
 const fs = require("fs");
 
 (async () => {
     let readStream;
     try {
         // Initial setup, create credentials instance
         const credentials = new ServicePrincipalCredentials({
             clientId: process.env.PDF_SERVICES_CLIENT_ID,
             clientSecret: process.env.PDF_SERVICES_CLIENT_SECRET
         });
 
         // Creates a PDF Services instance
         const pdfServices = new PDFServices({
             credentials
         });
 
         // Creates an asset(s) from source file(s) and upload
         readStream = fs.createReadStream("./output.pdf");
         const inputAsset = await pdfServices.upload({
             readStream,
             mimeType: MimeType.PDF
         });
 
         // Create parameters for the job
         const params = new ExportPDFToImagesParams({
             targetFormat: ExportPDFToImagesTargetFormat.JPEG,
             outputType: ExportPDFToImagesOutputType.LIST_OF_PAGE_IMAGES
         });
 
         // Creates a new job instance
         const job = new ExportPDFToImagesJob({
             inputAsset,
             params
         });
 
         // Submit the job and get the job result
         const pollingURL = await pdfServices.submit({
             job
         });
         const pdfServicesResponse = await pdfServices.getJobResult({
             pollingURL,
             resultType: ExportPDFToImagesResult
         });
 
         // Get content from the resulting asset(s)
         const resultAssets = pdfServicesResponse.result.assets;
 
         for (let i = 0; i < resultAssets.length; i++) {
             const _outputFilePath = "./exportPDFToImageOutput_${i}.jpeg";
             console.log(`Saving asset at ${_outputFilePath}`);
 
             const streamAsset = await pdfServices.getContent({
                 asset: resultAssets[i]
             });
 
             // Creates an output stream and copy stream asset's content to it
             const outputStream = fs.createWriteStream(_outputFilePath);
             streamAsset.readStream.pipe(outputStream);
         }
     } catch (err) {
         if (err instanceof SDKError || err instanceof ServiceUsageError || err instanceof ServiceApiError) {
             console.log("Exception encountered while executing operation", err);
         } else {
             console.log("Exception encountered while executing operation", err);
         }
     } finally {
         readStream?.destroy();
     }
 })();
 