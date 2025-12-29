/* eslint-disable no-unused-vars */
import { createClient } from "@supabase/supabase-js";


const url = "https://cwlwupuwjatezofxlgjm.supabase.co";
  const key ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3bHd1cHV3amF0ZXpvZnhsZ2ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5MTc3MzAsImV4cCI6MjA4MjQ5MzczMH0.EeBBbiMSut6uQR0VqXvE6xyqNj14oG9p8qpntQdP9Ls";

  const supabase = createClient(url,key)

  export default function fileUpload(file) {
    const mediaUploadPromise = new Promise(
        (resolve, reject) => {
            if (!file) {
                reject("No file provided for upload");
            }

            const fileName = `${Date.now()}_${file.name}`;
            supabase.storage.from("images").upload(fileName, file, {
                upsert: false,
                cacheControl: "3600"
            }).then(() => {
                const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
                resolve(publicUrl);
            }).catch((err) => {
                reject(err);
            });
        }
    )
    return mediaUploadPromise;
  }