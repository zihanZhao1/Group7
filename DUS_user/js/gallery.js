$(document).ready(function(){
    var Catan = "https://bgg-json.azurewebsites.net/thing/13";
    var RiverDragon = "https://bgg-json.azurewebsites.net/thing/634";
    var SmallWorld = "https://bgg-json.azurewebsites.net/thing/40692";
    var Takenoko = "https://bgg-json.azurewebsites.net/thing/70919";
    var Tokaido = "https://bgg-json.azurewebsites.net/thing/123540";
    var TerraformingMars = "https://bgg-json.azurewebsites.net/thing/167791";
    var PotionExplosion = "https://bgg-json.azurewebsites.net/thing/180974";
    var Kingdomino = "https://bgg-json.azurewebsites.net/thing/204583";
    var Queendomino = "https://bgg-json.azurewebsites.net/thing/232043";
    var TerraformingMarswithPrelude = "https://bgg-json.azurewebsites.net/thing/247030";

    $.ajax({
        url: Catan,
        dataType: "json",
        type: "GET",
        success: function(data){
            $("#img-01").attr('src',data.image);
            $("#title-01").text(data.name);
            $("#design-01").text(data.designers);
            $("#time-01").text(data.playingTime);
            $("#rate-01").text(data.averageRating);
        }
    });

    $.ajax({
        url: RiverDragon,
        dataType: "json",
        type: "GET",
        success: function(data){
            $("#img-02").attr('src',data.image);
            $("#title-02").text(data.name);
            $("#design-02").text(data.designers);
            $("#time-02").text(data.playingTime);
            $("#rate-02").text(data.averageRating);
        }
    });

    $.ajax({
        url: SmallWorld,
        dataType: "json",
        type: "GET",
        success: function(data){
            $("#img-03").attr('src',data.image);
            $("#title-03").text(data.name);
            $("#design-03").text(data.designers);
            $("#time-03").text(data.playingTime);
            $("#rate-03").text(data.averageRating);
        }
    });

    $.ajax({
        url: Takenoko,
        dataType: "json",
        type: "GET",
        success: function(data){
            $("#img-04").attr('src',data.image);
            $("#title-04").text(data.name);
            $("#design-04").text(data.designers);
            $("#time-04").text(data.playingTime);
            $("#rate-04").text(data.averageRating);
        }
    });

    $.ajax({
        url: Tokaido,
        dataType: "json",
        type: "GET",
        success: function(data){
            $("#img-05").attr('src',data.image);
            $("#title-05").text(data.name);
            $("#design-05").text(data.designers);
            $("#time-05").text(data.playingTime);
            $("#rate-05").text(data.averageRating);
        }
    });

    $.ajax({
        url: TerraformingMars,
        dataType: "json",
        type: "GET",
        success: function(data){
            $("#img-06").attr('src',data.image);
            $("#title-06").text(data.name);
            $("#design-06").text(data.designers);
            $("#time-06").text(data.playingTime);
            $("#rate-06").text(data.averageRating);
        }
    });

    $.ajax({
        url: PotionExplosion,
        dataType: "json",
        type: "GET",
        success: function(data){
            $("#img-07").attr('src',data.image);
            $("#title-07").text(data.name);
            $("#design-07").text(data.designers);
            $("#time-07").text(data.playingTime);
            $("#rate-07").text(data.averageRating);
        }
    });

    $.ajax({
        url: Kingdomino,
        dataType: "json",
        type: "GET",
        success: function(data){
            $("#img-08").attr('src',data.image);
            $("#title-08").text(data.name);
            $("#design-08").text(data.designers);
            $("#time-08").text(data.playingTime);
            $("#rate-08").text(data.averageRating);
        }
    });

    $.ajax({
        url: Queendomino,
        dataType: "json",
        type: "GET",
        success: function(data){
            $("#img-09").attr('src',data.image);
            $("#title-09").text(data.name);
            $("#design-09").text(data.designers);
            $("#time-09").text(data.playingTime);
            $("#rate-09").text(data.averageRating);
        }
    });

    $.ajax({
        url: TerraformingMarswithPrelude,
        dataType: "json",
        type: "GET",
        success: function(data){
            $("#img-10").attr('src',data.image);
            $("#title-10").text(data.name);
            $("#design-10").text(data.designers);
            $("#time-10").text(data.playingTime);
            $("#rate-10").text(data.averageRating);
        }
    });
});
