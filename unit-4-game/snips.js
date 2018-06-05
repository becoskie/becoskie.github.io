var boxes = $('.img_box').length;
populateCast(boxes);

// was in the onclick
var idNum = $(this).attr('id').slice(-1);
        var hideId = "#enemy_" + idNum;
        var choice = "#choice_"+ idNum;
        attacker = eval("cast_" + idNum);
        attacker.attack = 14;
        $(choice).children(".cast_name").append(attacker.name);
        $(choice).children(".health_stat").append(attacker.health);
        $(".img_box").not(this).hide();
        $(hideId).hide();
        $(".enemy_contain").show();
        defenders = enemies(parseInt(idNum));
        for(i = 0; i < defenders.length; i++) {
            defendCharacter = eval("cast_" + defenders[i]);
            $("#enemy_" + defenders[i]).children(".cast_name").append(defendCharacter.name);
            $("#enemy_" + defenders[i]).children(".health_stat").append(defendCharacter.health);
        }




        function enemies(item) {
            var array = [1, 2, 3, 4];
            var index = array.indexOf(item);
            if (index > -1) {
                array.splice(index, 1);
            }
            return array;
        }
        
        function populateCast(loop) {
            for(i=0; i<loop; i++) {
                console.log("Box " + i);
            }
        }

        
        switch (new Date().getDay()) {
            case 0:
                day = "Sunday";
                break;
            case 1:
                day = "Monday";
                break;
            case 2:
                day = "Tuesday";
                break;
            case 3:
                day = "Wednesday";
                break;
            case 4:
                day = "Thursday";
                break;
            case 5:
                day = "Friday";
                break;
            case  6:
                day = "Saturday";
        }


        for(i=1; i<$('.enemy_box').length + 1; i++) {
            eval($('#enemy_' + i).attr('data-cast')).attack = 1;
            console.log(eval($('#enemy_' + i).attr('data-cast')).name);
            console.log(eval($('#enemy_' + i).attr('data-cast')).attack);
        }

        console.log("Attacker = " + eval(attacker).name);