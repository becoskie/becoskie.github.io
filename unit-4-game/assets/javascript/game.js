$( document ).ready(function() {
    //console.log( "ready!" );
    
    var attacker;
    var defender;
    var cast_1 = new Cast(1,"C3P0",100,14,0);
    var cast_2 = new Cast(2,"Han Solo",120,8,0);
    var cast_3 = new Cast(3,"Yoda",150,14,0);
    var cast_4 = new Cast(4,"Princess Leia",180,8,0);
    var attackDamage;
    var clkCount = 1
    var wins = 0;

    $(".enemy_contain, .defend_box, .status, #restart_btn").hide();

    for(i=1; i<$('.img_box').length + 1; i++) {
        var attackChoice = eval($('#choice_' + i).attr('data-cast'));
        var defendCast = eval($('#enemy_' + i).attr('data-cast'));
        var defendCast = eval($('#defend_' + i).attr('data-cast'));
        $('#choice_' + i).children(".cast_name").append(attackChoice.name);
        $('#choice_' + i).children(".health_stat").append(attackChoice.health);
        $('#enemy_' + i).children(".cast_name").append(defendCast.name);
        $('#enemy_' + i).children(".health_stat").append(defendCast.health);
        $('#defend_' + i).children(".cast_name").append(defendCast.name);
        $('#defend_' + i).children(".health_stat").append(defendCast.health);
    }
   
    //choose attacker
    $(".img_box").click(function(){
        var idNum = $(this).attr('id').slice(-1);
        var hideEnemy = "#enemy_" + idNum;
        var hideDefend = "#defend_" + idNum;
        attacker = "cast_"+ idNum;
        $(".img_box").not(this).hide();
        $(hideEnemy).hide();
        $(hideDefend).hide();
        $(".enemy_contain").show();
        healthStart = eval(attacker).health;
        switch (eval(attacker).id) {
            case 1:
                cast_2.attack = 25;
                cast_3.attack = 30;
                cast_4.attack = 10;
                break;
            case 2:
                cast_1.attack = 5;
                cast_3.attack = 20;
                cast_4.attack = 25;
                break;
            case 3:
                cast_1.attack = 42;
                cast_2.attack = 25;
                cast_4.attack = 30;
                break;
            case 4:
                cast_1.attack = 39;
                cast_2.attack = 30;
                cast_3.attack = 10;
                break;
        }
    });
    // choose defender
    $(".enemy_box").click(function(){
        if($(".defend_box").is(':visible')) {
            alert("You need to ride it out, can't switch up now.");
        } else {
        var idNum = $(this).attr('id').slice(-1);
        $("#enemy_" + idNum).hide();
        $("#defend_" + idNum).show();
        defender = "cast_"+ idNum;
        $("#attack_for").text("");
        $("#attack_back").text("");
        }
    });
    // attack
    $("#attack_btn").click(function(e){
        // TODO you have to eval attacker and defender
        e.preventDefault();
        if($(".defend_box").is(':visible')) {
            var aValue = eval(attacker);
            var dValue = eval(defender);
            attackDamage = clkCount * aValue.base;
            $(".status").show();
            $("#attack_for").text(`${aValue.name} attacked for ${attackDamage}.`);
            $("#attack_back").text(`${dValue.name} attacked back for ${dValue.attack}.`);
            dValue.health = dValue.health - attackDamage;
            // dead folks lightsaber shit don't count
            if(dValue.health < 1) {
                wins++;
                $("#attack_back").hide();
                $("#defend_" + dValue.id).hide();
                    if (wins === 3) {
                        $("#restart_btn").show();
                        $("#attack_btn").off("click");
                        $("#attack_for").text(`You WIN!!!  GAME OVER.`);
                    } else {
                        $("#attack_for").text(`You have defeated ${dValue.name}, you can choose to fight another enemy.`);
                    }
            } else {
                aValue.health = aValue.health - dValue.attack;
            }            
            $('#choice_' + aValue.id).children(".health_stat").text(aValue.health);
            $('#defend_' + dValue.id).children(".health_stat").text(dValue.health);
            if (aValue.health < 1 && dValue.health > 1) {
                $("#attack_back").hide();
                $('#choice_' + aValue.id).children(".health_stat").text("dead.");
                $("#attack_for").text("You have been defeated... GAME OVER!!!");
                $("#restart_btn").show();
                $("#attack_btn").off("click");
            }
        } else {
            alert("choose character and a enemy.");
        }
        clkCount++;
    });

    $("#restart_btn").click(function(e){
        location.reload();
    });
    
});//don't delete

function Cast(id,name,health,base,attack) {
    this.id = id;
    this.name = name;
    this.health = health;
    this.base = base;
    this.attack = attack;
}


