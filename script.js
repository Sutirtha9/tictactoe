//Round Number Selection
var round=0;
document.querySelectorAll('.round #round').forEach(e =>
{
    e.addEventListener('click',()=>
    {
        document.querySelectorAll('.round #round').forEach(b =>
        {
            if(b.className == 'on')
            {
                b.classList.remove('on');
            }
        });
        round=parseInt(e.innerHTML);
        document.querySelector('.popup #play').disabled=false;
        e.classList.add('on');
    });
});

//When we click play
document.querySelector('.popup #play').addEventListener('click',()=>
{
    document.querySelector('.popup').style.visibility='hidden';
    document.querySelector('.main').style.visibility='visible';
    document.querySelector('.texts').style.visibility='visible';
    document.querySelector('#totalRounds').style.visibility='visible';

    document.querySelector('#totalRounds').innerHTML='Rounds : '+round;
});




//Main Tic Tac Toe
var player=2;

var circleScore=0,crossScore=0;
document.querySelectorAll('.box').forEach(e =>
{
    e.addEventListener('click',()=>
    {
        
        if(e.class != 'on')
        {
            if(player==1)
            {
                e.innerHTML='<ion-icon name="close-outline" id="cross"></ion-icon>';

                document.querySelector('.texts #turn ion-icon').name='ellipse-outline';
                document.querySelector('.texts #turn ion-icon').id='circle';

                player=2;
            }
            else
            {
                e.innerHTML='<ion-icon name="ellipse-outline" id="circle"></ion-icon>';

                document.querySelector('.texts #turn ion-icon').name='close-outline';
                document.querySelector('.texts #turn ion-icon').id='cross';
                
                player=1;
            }

            e.class='on';

            var currentPlayer = e.querySelector('ion-icon').id;

            //For Left,Right Matching
            var count=0;
            for(var i=1;i<=9;i++)
            {
                if(document.querySelector(`.main .box:nth-child(${i})`).innerHTML != '')
                {
                    if(document.querySelector(`.main .box:nth-child(${i}) ion-icon`).id == currentPlayer)
                    {
                        count++;
                    }
                }

                if(count==3)
                {
                    setTimeout(()=>{winPopup(currentPlayer);},75)
                }

                if(i%3==0)
                {
                    count=0;
                }
            }

            //For Top,Down Matching
            count=0;
            for(var i=1;i<=3;i++)
            {
                for(var j=i;j<=i+6;j=j+3)
                {
                    if(document.querySelector(`.main .box:nth-child(${j})`).innerHTML != '')
                    {
                        if(document.querySelector(`.main .box:nth-child(${j}) ion-icon`).id == currentPlayer)
                        {
                            count++;
                        }
                    }

                    if(count==3)
                    {
                        setTimeout(()=>{winPopup(currentPlayer);},75);
                    }
                }
                count=0;
            }

            //For Left,Down Matching
            count=0;
            for(var i=1;i<=9;i=i+4)
            {
                if(document.querySelector(`.main .box:nth-child(${i})`).innerHTML != '')
                {
                    if(document.querySelector(`.main .box:nth-child(${i}) ion-icon`).id == currentPlayer)
                    {
                        count++;
                    }
                }

                if(count==3)
                {
                    setTimeout(()=>{winPopup(currentPlayer);},75);
                }

            }

            //For Right,Down Matching
            count=0;
            for(var i=3;i<=7;i=i+2)
            {
                if(document.querySelector(`.main .box:nth-child(${i})`).innerHTML != '')
                {
                    if(document.querySelector(`.main .box:nth-child(${i}) ion-icon`).id == currentPlayer)
                    {
                        count++;
                    }
                }

                if(count==3)
                {
                    setTimeout(()=>{winPopup(currentPlayer);},75);
                }

            }

            //For draw
            count=0;
            document.querySelectorAll('.main .box').forEach(e =>
            {
                if(e.class == 'on')
                {
                    count++;  
                }

            });

            if(count == 9)
            {
                winPopup('draw');
            }
        }
    });
});

//Winning Popup and Functions
const winPopup=(plyr)=>
{
    document.querySelector('.popup').style.visibility='visible';
    document.querySelector('.main').style.visibility='hidden';
    document.querySelector('.texts').style.visibility='hidden';
    document.querySelector('#totalRounds').style.visibility='hidden';
    document.querySelector('.popup').style.backdropFilter='blur(50px)';

    if(plyr == 'cross')
    {
        crossScore++;
        document.querySelector('.popup').innerHTML=`<h1><ion-icon name="close-outline" id="cross"></ion-icon> Won This Round !!</h1>
                                                    <p>Score : ${crossScore}</p>`;
    }
    else
    {
        if(plyr == 'circle')
        {
            circleScore++;
            document.querySelector('.popup').innerHTML=`<h1><ion-icon name="ellipse-outline" id="circle"></ion-icon> Won This Round !!</h1>
                                                        <p>Score : ${circleScore}</p>`;
        }
        else
        {
            if(plyr == 'draw')
            {
                document.querySelector('.popup').innerHTML=`<h1>It's A Draw !!</h1>`;
            }
        }
    }

    document.querySelector('.texts #score').innerHTML=`<p>Score : <ion-icon name="close-outline" id="cross"></ion-icon>: ${crossScore} </p> <br> <p><ion-icon name="ellipse-outline" id="circle"></ion-icon>: ${circleScore}</p>`;
    document.querySelector('.popup').innerHTML+=`
    <div class="winButtons">
        <button id="home" onclick="window.location.reload();">Home</button>
        <button id="nextRound">Next</button>
    </div>`;

    //Checking if the last round has been played or not
    if((crossScore+circleScore) == round)
    {
        if(crossScore>circleScore)
        {
            document.querySelector('.popup').innerHTML=`<h1><ion-icon name="close-outline" id="cross"></ion-icon> Won The Match !!</h1>
                                                        <p>Score : ${crossScore}</p>`;
        }
        else
        {
            if(crossScore == circleScore)
            {
                document.querySelector('.popup').innerHTML=`<h1>Match Draw !!</h1>`;
            }
            else
            {
                document.querySelector('.popup').innerHTML=`<h1><ion-icon name="ellipse-outline" id="circle"></ion-icon> Won The Match !!</h1>
                                                            <p>Score : ${circleScore}</p>`;
            }
        }

        document.querySelector('.texts #score').innerHTML=`<p>Score : <ion-icon name="close-outline" id="cross"></ion-icon>: ${crossScore} </p> <br> <p><ion-icon name="ellipse-outline" id="circle"></ion-icon>: ${circleScore}</p>`;
        document.querySelector('.popup').innerHTML+=`
        <div class="winButtons">
            <button id="home" onclick="window.location.reload();">Home</button>
        </div>`;
    }


    //Next button functions inside the win popup
    document.querySelector('.popup .winButtons #nextRound').addEventListener('click',()=>
    {
        document.querySelector('.popup').style.visibility='hidden';
        document.querySelector('.main').style.visibility='visible';
        document.querySelector('.texts').style.visibility='visible';
        document.querySelector('#totalRounds').style.visibility='visible';
        
        document.querySelectorAll('.main .box').forEach(e =>
        {
            e.innerHTML='';
            e.class='';
        });
    });
}

document.querySelector('#creator').innerHTML='By Sutirtha';