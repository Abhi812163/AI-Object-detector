status="";
video="";
object=[];

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
}

function preload(){
    video=createVideo("video.mp4");
    video.hide();
}

function draw(){
    image(video,0,0,480,380);
    if(status!=""){
        objectDetector.detect(video, gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML=object_name+" Found";

            document.getElementById("object_name").innerHTML="Number of objects detected: "+objects.length;
            fill("#cfc102");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke("#cfc102");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

            if(objects[i].label==object_name){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML=object_name+"Found";
                synth=window.speechSynthesis;
                utterThis=new SpeechSynthesisUtterance(object_name+"Found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("status").innerHTML=object_name+"Not Found"
            }
        }
    }
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    document.getElementById("input").value;
}

function modelLoaded(){
    console.log("Model is loaded");
    status=true;
    video.loop();
    video.volume(0);
    video.speed(1);
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}