import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload as UploadIcon, FileText, Video, Image } from "lucide-react";

const Upload = () => {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold">Upload Content</h1>
          <p className="text-muted-foreground mt-1">
            Upload your files to generate content across all platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center p-8">
            <CardHeader>
              <FileText className="h-12 w-12 mx-auto text-brand-500 mb-4" />
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Upload PDF, DOCX, and CSV files
              </p>
              <Button className="w-full">
                <UploadIcon className="h-4 w-4 mr-2" />
                Upload Documents
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center p-8">
            <CardHeader>
              <Video className="h-12 w-12 mx-auto text-brand-500 mb-4" />
              <CardTitle>Videos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Upload MP4, MOV, and AVI files
              </p>
              <Button className="w-full">
                <UploadIcon className="h-4 w-4 mr-2" />
                Upload Videos
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center p-8">
            <CardHeader>
              <Image className="h-12 w-12 mx-auto text-brand-500 mb-4" />
              <CardTitle>Images</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Upload JPG, PNG, and SVG files
              </p>
              <Button className="w-full">
                <UploadIcon className="h-4 w-4 mr-2" />
                Upload Images
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Upload;
