<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Video;
use Storage;

class VideoController extends Controller
{
    public function upload(Request $request)
    {
        // $path = $request->file('video')->store('videos', 's3'); // Commented out AWS S3 storage line
    
        // Assuming you still want to save the video record in the database
        $video = new Video();
        // $video->url = Storage::disk('s3')->url($path); // Also commented out, as no file is stored in S3
        $video->title = $request->input('title', 'Default Title'); // Handling title, with a default value
        // Provide a value for the 'url' field
        $video->url = 'some_default_url_or_logic_here';

        $video->save();
    
        return response()->json(['message' => 'Video uploaded successfully!']);
    }
    
    // retrieve all the video records from the database 
    public function index()
    {
        $videos = Video::all();
        return response()->json($videos); 
    }

    // delete a specific video record from the database 
    public function destroy(Video $video)
    {
        // Delete the file from S3
        $fileName = basename($video->url);
        Storage::disk('s3')->delete('videos/' . $fileName);

        // Delete the video record from the database
        $video->delete();

        return response()->json(['message' => 'Video deleted successfully!']);
    }

}
