<html>
    <head>
        <link rel="stylesheet" href="../css/style.css">
        <link rel="stylesheet" href="../css/index.css">
        <script src="../js/jquery.min.js"></script>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Our Facilities - Durham University</title>
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <link rel="shortcut icon" href="../img/favicon.ico" type="image/x-icon"/>

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
                integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
                crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
                integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
                crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
              integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    </head>
    <body class="home"> 
        <div class="container-fluid">
            <?php include("head.php");?>
            <div id="content" class="row-fluid">
                <div class="span2 pages">
                    <ul>
                        <li class='navcurrent'><h3> About Us</h3></li>
                    </ul>
                </div>
                <div class="span10">
                    <div class="card text-left">
                        <div class="card-header">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" data-toggle="tab" href="#intro" id="intro-tab" role="tab" aria-controls="intro" aria-selected="true">About Durham University</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="tab" href="#dep" id="dep-tab" role="tab" aria-controls="dep" aria-selected="false">Performance Sports</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="tab" href="#contact" id="contact-tab" role="tab" aria-controls="contact" aria-selected="false">Contact Us</a>
                                </li>
                            </ul>
                        </div>
                        <div class="card-body">
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane" id="intro" role="tabpanel" aria-labelledby="intro-tab">
                                    <h><strong>Why choose Durham?</strong></h><br>
                                    <p>Durham University is a world renowned institution for Higher Education set in the beautiful surroundings of an historic cathedral city. The University is Collegiate with the Colleges providing unique residential, social and welfare facilities for their student members, and creating a sense of community for staff and students together. Durham prides itself on its ability to help develop the leaders of the future and has the highest of academic standards.
                                    </p>
                                </div>
                                <div class="tab-pane" id="dep" role="tabpanel" aria-labelledby="dep-tab">
                                    <h><strong>Performence Sports</strong></h><br>
                                    <p>At the present time we have professional coaching support in:<p>
                                    <ul style="list-style-type:disc;">
                                        <li>Basketball (Men’s & Women’s)</li>
                                        <li>Cricket (Men’s & Women’s)</li>
                                        <li>Fencing (Men’s & Women’s)</li>
                                        <li>Hockey (Men’s & Women’s)</li>
                                        <li>Lacrosse (Men’s)</li>
                                        <li>Lacrosse (Women's)</li>
                                        <li>Netball</li>
                                        <li>Tennis (Men’s & Women’s)</li>
                                        <li>Rowing (Men’s & Women’s)</li>
                                        <li>Rugby Union (Men's)</li>
                                        <li>Volleyball (Men's & Women's)</li>
                                    </ul>
                                    <p>We have part time coaches in a further 15 sports. The difference that a professional structure can make to the development of student athletes should not be underestimated. We are a British Rowing Performance Centre, we have First Class County Cricket status, Tennis Foundation University Performance Centre status, English Lacrosse High Performance status and British Fencing Centre status. In addition to university leagues, teams compete in the England Hockey National League, the British Basketball League, the National Volleyball League and the Women's Football Super League and boast a host of rowers, fencers and lacrosse players who compete at an international level on an annual basis. On average we help to develop over 30 student athletes, across over 15 sports, who compete at international level each academic year. Current examples of students that competed at senior international level recently include Gemma Collis (Fencing), Heather Kerr (Women's Rugby) and Dan Robson (Canoeing).</p>
                                    <p>The performance sport athlete support structure is also extensive. Students can access a wide range of services including strength and conditioning, injury support, nutritional guidance and lifestyle management support. We work closely with sport national governing bodies to ensure that the university’s basketball, cricket, fencing, lacrosse, rowing and tennis programmes are delivered in conjunction with the respective national organisations. Few institutions more seamlessly, successfully and consistently combine sporting and academic excellence.</p>
                                    <p>Sport scholarships are available for high calibre undergraduate (home students) and postgraduate (international students) athletes.
                                    </p>
                                </div>
                                <div class="tab-pane" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                    <h><strong>Contact Us</strong></h>
                                    <p>For prices, bookings, membership enquiries or general enquiries, please contact us:</p><br>
                                    <p><strong>Tel:</strong> 0191 334 2178</p>
                                    <p>For multi-bookings or events please contact:</p>
                                    <p><strong>Tel:</strong> 0191 334 7216</p>
                                    <p>Email: teamdurham.bookings@durham.ac.uk</p>
                                    <br>
                                    <p><strong>Durham University Sport</strong></p>
                                    <p>The Graham Sports Centre,<br>
                                    Durham University<br>
                                    Stockton Road<br>
                                    DH1 3SE</p>
                                    <h><strong>Parking</strong></h>
                                    <p>Parking is available onsite at the main car park.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <?php include("foot.php");?>
        </div>
        <script>
            $(function () {
                $('#myTab li:last-child a').tab('show')
            })
            <?php logoutBlock(); ?>
        </script>
    </body>
</html>