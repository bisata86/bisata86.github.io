
$(function() {
    var clickValues = {'gold':10,'wood':10,'food':10};
    var tentCosts = {'gold':100,'wood':150,'food':10};
    var houseCosts = {'gold':1000,'wood':1500,'food':100};
    var betterWoodCosts = {'gold':120,'wood':130,'food':140};
    var betterGoldCosts = {'gold':110,'wood':150,'food':160};
    var betterFoodCosts = {'gold':100,'wood':140,'food':130};
    var sausagesCost = {'gold':0,'wood':10,'food':15};
    var hospitalCost = {'gold':1100,'wood':1100,'food':1340};
    var woodMakerCost = {'gold':10,'wood':12,'food':15};
    var goldMakerCost = {'gold':1,'wood':2,'food':3};
    var foodMakerCost = {'gold':1,'wood':2,'food':3};
    var betterFarm = {'gold':10,'wood':20,'food':30};
    var betterMill = {'gold':10,'wood':20,'food':30};
    var betterMine = {'gold':10,'wood':20,'food':30};
    var improveExtraction = {'farms':1,'mills':1,'mines':1}
    var prices = {'hospital':hospitalCost,'betterFarm':betterFarm,'betterMill':betterMill,'betterMine':betterMine,'sausages':sausagesCost,'tent':tentCosts,'house':houseCosts,'betterWood':betterWoodCosts,'woodMaker':woodMakerCost,'betterGold':betterGoldCosts,'goldMaker':goldMakerCost,'betterFood':betterFoodCosts,'foodMaker':foodMakerCost};
    var workingPeople = {'gold':0,'wood':0,'food':0};
    var game = {'population':10,'space':15,'increment':1000,'improveExtraction':improveExtraction,'gold':500,'wood':500,'food':500,'workers':workingPeople,'clickValues':clickValues, 'prices':prices}
    var gameInterval;
    var bonusBarCounter = 0;
    start();
    updateDisplay();
    updateUpgrades();
    chechIfPurchaseable();
    var canvasHeight = $(window).height()-$('#infos').height()-$('#resources').height()-$('#numbersResources').height()-$('#bonusbar').height();
    console.log(canvasHeight)
    $('#canvas').css({
        height: canvasHeight
    });
    $('.tab-content').css({
        height: $(window).height()/2,
        'overflow': 'scroll'
    });

    function start() {
        var counter = 1;
        gameInterval = setInterval(function(){
            game.gold = ((game.workers.gold)*game.improveExtraction.mines)+game.gold;
            game.wood = ((game.workers.wood)*game.improveExtraction.mills)+game.wood;
            game.food = ((game.workers.food)*game.improveExtraction.farms)+game.food;
            if(counter%game.increment == 0 && game.space>game.population) game.population = game.population + 1;
            updateDisplay();
            if(counter%10 == 0) {
                chechIfPurchaseable()
                if(bonusBarCounter>=0) {
                     bonusBarCounter--
                     $('#bonusbar div').css({
                        'width': bonusBarCounter/bonusBarMultiplier+'%'
                    });
                }
                //  if (bonusBarCounter==0) {
                //     if(bonusBarMultiplier!=1) {
                //      bonusBarMultiplier--;
                //      bonusBarCounter=100;
                //      $('#bonusbar div').css({
                //         'width': bonusBarCounter/bonusBarMultiplier+'%'
                //     });
                //      }
                // }
            }
            counter++;
            if(game.population == 100) {
                alert('level++')
            }
        }, 100);
    }
    function stop() {
        clearInterval(gameInterval);
    }
    function chechIfPurchaseable() {
        $('.tab-content input').each(function(index, el) {
            var current = $(el).closest('tr').attr('id');
            if(current=='tent') {
                if( game.gold >= game.prices.tent.gold && game.wood >= game.prices.tent.wood && game.food >= game.prices.tent.food) {
                    $(el).removeAttr('disabled');
                }
                else $(el).attr('disabled', 'disabled');
            } else
            if(current=='house') {
                if( game.gold >= game.prices.house.gold && game.wood >= game.prices.house.wood && game.food >= game.prices.house.food) {
                    $(el).removeAttr('disabled');
                }
                else $(el).attr('disabled', 'disabled');
            } else
            if(current=='hospital') {
                if( game.gold >= game.prices.hospital.gold && game.wood >= game.prices.hospital.wood && game.food >= game.prices.hospital.food) {
                    $(el).removeAttr('disabled');
                }
                else $(el).attr('disabled', 'disabled');
            } else
            if(current=='woodMaker') {
                if( game.gold >= game.prices.woodMaker.gold && game.wood >= game.prices.woodMaker.wood && game.food >= game.prices.woodMaker.food) {
                    $(el).removeAttr('disabled');
                }
                else $(el).attr('disabled', 'disabled');
            } else
            if(current=='foodMaker') {
                if( game.gold >= game.prices.foodMaker.gold && game.wood >= game.prices.foodMaker.wood && game.food >= game.prices.foodMaker.food) {
                    $(el).removeAttr('disabled');
                }
                else $(el).attr('disabled', 'disabled');
            } else
            if(current=='goldMaker') {
                if( game.gold >= game.prices.goldMaker.gold && game.wood >= game.prices.goldMaker.wood && game.food >= game.prices.goldMaker.food) {
                    $(el).removeAttr('disabled');
                }
                else $(el).attr('disabled', 'disabled');
            } else
            if(current=='woodClick') {
                if( game.gold >= game.prices.betterWood.gold && game.wood >= game.prices.betterWood.wood && game.food >= game.prices.betterWood.food) {
                    $(el).removeAttr('disabled');
                }
                else $(el).attr('disabled', 'disabled');
            } else
            if(current=='foodClick') {
                if( game.gold >= game.prices.betterFood.gold && game.wood >= game.prices.betterFood.wood && game.food >= game.prices.betterFood.food) {
                    $(el).removeAttr('disabled');
                }
                else $(el).attr('disabled', 'disabled');
            } else
            if(current=='goldClick') {
                if( game.gold >= game.prices.betterGold.gold && game.wood >= game.prices.betterGold.wood && game.food >= game.prices.betterGold.food) {
                    $(el).removeAttr('disabled');
                }
                else $(el).attr('disabled', 'disabled');
            } else
            if(current=='sausages') {
                if( game.gold >= game.prices.sausages.gold && game.wood >= game.prices.sausages.wood && game.food >= game.prices.sausages.food) {
                    $(el).removeAttr('disabled');
                }
                else $(el).attr('disabled', 'disabled');
            } else
            if(current=='betterFarms') {
                if( game.gold >= game.prices.betterFarm.gold && game.wood >= game.prices.betterFarm.wood && game.food >= game.prices.betterFarm.food) {
                    $(el).removeAttr('disabled');
                }
                else $(el).attr('disabled', 'disabled');
            }  else
            if(current=='betterMills') {
                if( game.gold >= game.prices.betterMill.gold && game.wood >= game.prices.betterMill.wood && game.food >= game.prices.betterMill.food) {
                    $(el).removeAttr('disabled');
                }
                else $(el).attr('disabled', 'disabled');
            }   else
            if(current=='betterMines') {
                if( game.gold >= game.prices.betterMine.gold && game.wood >= game.prices.betterMine.wood && game.food >= game.prices.betterMine.food) {
                    $(el).removeAttr('disabled');
                }
                else $(el).attr('disabled', 'disabled');
            }

        });

    }
    function updateDisplay() {
        $('#population').html(game.population);
        $('#gold').html(game.gold);
        $('#food').html(game.food);
        $('#wood').html(game.wood);
        $('#wood').html(game.wood);
    }
    function updateUpgrades() {
        $('#population').html(game.population);
        $('#spaceForPeople').html(game.space);
        $('#gold').html(game.gold);
        $('#food').html(game.food);
        $('#wood').html(game.wood);
        $('#wood').html(game.wood);

        $('#tent .woodCost').html(game.prices.tent.wood);
        $('#tent .goldCost').html(game.prices.tent.gold);
        $('#tent .foodCost').html(game.prices.tent.food);

        $('#house .woodCost').html(game.prices.house.wood);
        $('#house .goldCost').html(game.prices.house.gold);
        $('#house .foodCost').html(game.prices.house.food);


        $('#woodClick .woodCost').html(game.prices.betterWood.wood);
        $('#woodClick .goldCost').html(game.prices.betterWood.gold);
        $('#woodClick .foodCost').html(game.prices.betterWood.food);


        $('#goldClick .woodCost').html(game.prices.betterGold.wood);
        $('#goldClick .goldCost').html(game.prices.betterGold.gold);
        $('#goldClick .foodCost').html(game.prices.betterGold.food);

        $('#foodClick .woodCost').html(game.prices.betterFood.wood);
        $('#foodClick .goldCost').html(game.prices.betterFood.gold);
        $('#foodClick .foodCost').html(game.prices.betterFood.food);

        $('#sausages .woodCost').html(game.prices.sausages.wood);
        $('#sausages .goldCost').html(game.prices.sausages.gold);
        $('#sausages .foodCost').html(game.prices.sausages.food);

        $('#hospital .woodCost').html(game.prices.hospital.wood);
        $('#hospital .goldCost').html(game.prices.hospital.gold);
        $('#hospital .foodCost').html(game.prices.hospital.food);

        $('#woodMaker .woodCost').html(game.prices.woodMaker.wood);
        $('#woodMaker .goldCost').html(game.prices.woodMaker.gold);
        $('#woodMaker .foodCost').html(game.prices.woodMaker.food);

         $('#foodMaker .woodCost').html(game.prices.foodMaker.wood);
        $('#foodMaker .goldCost').html(game.prices.foodMaker.gold);
        $('#foodMaker .foodCost').html(game.prices.foodMaker.food);

        $('#goldMaker .woodCost').html(game.prices.goldMaker.wood);
        $('#goldMaker .goldCost').html(game.prices.goldMaker.gold);
        $('#goldMaker .foodCost').html(game.prices.goldMaker.food);

        $('#betterFarms .woodCost').html(game.prices.betterFarm.wood);
        $('#betterFarms .goldCost').html(game.prices.betterFarm.gold);
        $('#betterFarms .foodCost').html(game.prices.betterFarm.food);

        $('#betterMills .woodCost').html(game.prices.betterMill.wood);
        $('#betterMills .goldCost').html(game.prices.betterMill.gold);
        $('#betterMills .foodCost').html(game.prices.betterMill.food);

        $('#betterMines .woodCost').html(game.prices.betterMine.wood);
        $('#betterMines .goldCost').html(game.prices.betterMine.gold);
        $('#betterMines .foodCost').html(game.prices.betterMine.food);

    }
    $('#resources').on('touchstart mousedown', "div", function(event) {
            $(this).css({
                'background-size': '90px'
            });
    });
    $('#resources').on('mouseup', "div", function(event) {
            $(this).css({
                'background-size': '100px'
            });
    });
    var bonusBarMultiplier = 1;
    $('#resources').on('click', "div", function(event) {
            bonusBarCounter++;
            if(bonusBarCounter >= 100*bonusBarMultiplier) {
                bonusBarCounter = 0;
                bonusBarMultiplier++;
                // game.wood = game.wood*2
                // game.food = game.food*2
                // game.gold = game.gold*2
                game.clickValues.wood = game.clickValues.wood*2;
                game.clickValues.food = game.clickValues.food*2;
                game.clickValues.gold = game.clickValues.gold*2;
                console.log('eccomi')
                $('#bonusbar div').css({
                    'width': '0%'
                });

            } else {
                $('#bonusbar div').css({
                    'width': bonusBarCounter/bonusBarMultiplier+'%'
                });
            }
            event.preventDefault();
            currResource = $(this).attr('class');
            $('#improvements').addClass('opened');
            //stop();
            var rndmclass =  Math.floor(Math.random()*100+1);
            if(currResource=='wood') {
                //console.log('wood + '+game.clickValues.wood);
                $(this).append("<span class='alerta "+rndmclass+"'>+ "+game.clickValues.wood+"</span>");
                game.wood = game.wood+game.clickValues.wood
            }
            if(currResource=='food') {
                //console.log('food + '+game.clickValues.food);
                $(this).append("<span class='alerta "+rndmclass+"'>+ "+game.clickValues.food+"</span>");
                game.food = game.food+game.clickValues.food
            }
            if(currResource=='gold') {
                //console.log('gold + '+game.clickValues.gold);
                $(this).append("<span class='alerta "+rndmclass+"'>+ "+game.clickValues.gold+"</span>");
                game.gold = game.gold+game.clickValues.gold
            }


            setTimeout(function(){
                $("."+rndmclass).css({
                    top: -70
                });
                    setTimeout(function(){
                        $("."+rndmclass).remove()
                    }, 500);
             }, 10);

            //start();
    });
    $('#tent').on('click', 'input', function(event) {
        if( game.gold >= game.prices.tent.gold && game.wood >= game.prices.tent.wood && game.food >= game.prices.tent.food)  {
            //stop();
            game.gold = game.gold-game.prices.tent.gold;
            game.wood = game.wood-game.prices.tent.wood;
            game.food = game.food-game.prices.tent.food;
            game.prices.tent.food = parseInt(game.prices.tent.food+(300));
            game.prices.tent.gold = parseInt(game.prices.tent.gold+(300));
            game.prices.tent.wood = parseInt(game.prices.tent.wood+(300));
            game.space = game.space+5;
            $('.houseplace').append('<div class="tenda"></div>');
            updateUpgrades()
            chechIfPurchaseable()
            //start();
        } else {
            console.log('not enought resources');
        }
    });
    $('#house').on('click', 'input', function(event) {
        if( game.gold >= game.prices.house.gold && game.wood >= game.prices.house.wood && game.food >= game.prices.house.food)  {
            //stop();
            game.gold = game.gold-game.prices.house.gold;
            game.wood = game.wood-game.prices.house.wood;
            game.food = game.food-game.prices.house.food;
            game.prices.house.food = parseInt(game.prices.house.food*(4/3));
            game.prices.house.gold = parseInt(game.prices.house.gold*(4/3));
            game.prices.house.wood = parseInt(game.prices.house.wood*(4/3));
            game.space = game.space+10;
            updateUpgrades()
            chechIfPurchaseable()
            $('.houseplace').append('<div class="casa"></div>');
            //start();
        } else {
            console.log('not enought resources');
        }
    });
    $('#hospital').on('click', 'input', function(event) {
        if( game.gold >= game.prices.hospital.gold && game.wood >= game.prices.hospital.wood && game.food >= game.prices.hospital.food)  {
        game.gold = game.gold-game.prices.hospital.gold;
        game.wood = game.wood-game.prices.hospital.wood;
        game.food = game.food-game.prices.hospital.food;
        game.prices.hospital.gold = game.prices.hospital.gold*2;
        game.prices.hospital.food = game.prices.hospital.food*2;
        game.prices.hospital.wood = game.prices.hospital.wood*2;
        if(game.increment==1000) {
            game.increment = 50;
        } else if (game.increment>10) {
            game.increment = game.increment-10
        } else if(game.increment>1) {
            game.increment = game.increment-1
            console.log('maxed');
        }
        console.log(game.increment);
        updateUpgrades()
        chechIfPurchaseable()
        $('.structureplace').append('<div class="ospedale"></div>');
        } else {
            console.log('not enought resources');
        }
    });
    $('#woodClick').on('click', 'input', function(event) {
        if( game.gold >= game.prices.betterWood.gold && game.wood >= game.prices.betterWood.wood && game.food >= game.prices.betterWood.food)  {
        game.gold = game.gold-game.prices.betterWood.gold;
        game.wood = game.wood-game.prices.betterWood.wood;
        game.food = game.food-game.prices.betterWood.food;
        game.clickValues.wood = game.clickValues.wood*2;
        game.prices.betterWood.gold = game.prices.betterWood.gold*5;
        game.prices.betterWood.food = game.prices.betterWood.food*5;
        game.prices.betterWood.wood = game.prices.betterWood.wood*5;
        updateUpgrades()
        chechIfPurchaseable()
        } else {
            console.log('not enought resources');
        }
    });
    $('#betterFarms').on('click', 'input', function(event) {
        if( game.gold >= game.prices.betterFarm.gold && game.wood >= game.prices.betterFarm.wood && game.food >= game.prices.betterFarm.food)  {
        game.gold = game.gold-game.prices.betterFarm.gold;
        game.wood = game.wood-game.prices.betterFarm.wood;
        game.food = game.food-game.prices.betterFarm.food;
        game.improveExtraction.farms = game.improveExtraction.farms*2;
        game.prices.betterFarm.gold = game.prices.betterFarm.gold*5;
        game.prices.betterFarm.food = game.prices.betterFarm.food*5;
        game.prices.betterFarm.wood = game.prices.betterFarm.wood*5;
        updateUpgrades()
        chechIfPurchaseable()
        } else {
            console.log('not enought resources');
        }
    });
    $('#betterMills').on('click', 'input', function(event) {
        if( game.gold >= game.prices.betterMill.gold && game.wood >= game.prices.betterMill.wood && game.food >= game.prices.betterMill.food)  {
        game.gold = game.gold-game.prices.betterMill.gold;
        game.wood = game.wood-game.prices.betterMill.wood;
        game.food = game.food-game.prices.betterMill.food;
        game.improveExtraction.mills = game.improveExtraction.mills*2;
        game.prices.betterMill.gold = game.prices.betterMill.gold*5;
        game.prices.betterMill.food = game.prices.betterMill.food*5;
        game.prices.betterMill.wood = game.prices.betterMill.wood*5;
        updateUpgrades()
        chechIfPurchaseable()
        } else {
            console.log('not enought resources');
        }
    });
    $('#betterMines').on('click', 'input', function(event) {
        if( game.gold >= game.prices.betterMine.gold && game.wood >= game.prices.betterMine.wood && game.food >= game.prices.betterMine.food)  {
        game.gold = game.gold-game.prices.betterMine.gold;
        game.wood = game.wood-game.prices.betterMine.wood;
        game.food = game.food-game.prices.betterMine.food;
        game.improveExtraction.mines = game.improveExtraction.mines*2;
        game.prices.betterMine.gold = game.prices.betterMine.gold*5;
        game.prices.betterMine.food = game.prices.betterMine.food*5;
        game.prices.betterMine.wood = game.prices.betterMine.wood*5;
        updateUpgrades()
        chechIfPurchaseable()
        } else {
            console.log('not enought resources');
        }
    });
    $('#goldClick').on('click', 'input', function(event) {
        if( game.gold >= game.prices.betterGold.gold && game.wood >= game.prices.betterGold.wood && game.food >= game.prices.betterGold.food)  {
        game.gold = game.gold-game.prices.betterGold.gold;
        game.wood = game.wood-game.prices.betterGold.wood;
        game.food = game.food-game.prices.betterGold.food;
        game.clickValues.gold = game.clickValues.gold*2;
        game.prices.betterGold.gold = game.prices.betterGold.gold*5;
        game.prices.betterGold.food = game.prices.betterGold.food*5;
        game.prices.betterGold.wood = game.prices.betterGold.wood*5;
        updateUpgrades()
        chechIfPurchaseable()
        } else {
            console.log('not enought resources');
        }
    });
    $('#foodClick').on('click', function(event) {
        if( game.gold >= game.prices.betterFood.gold && game.wood >= game.prices.betterFood.wood && game.food >= game.prices.betterFood.food)  {
        game.gold = game.gold-game.prices.betterFood.gold;
        game.wood = game.wood-game.prices.betterFood.wood;
        game.food = game.food-game.prices.betterFood.food;
        game.clickValues.food = game.clickValues.food*2;
        game.prices.betterFood.gold = game.prices.betterFood.gold*5;
        game.prices.betterFood.food = game.prices.betterFood.food*5;
        game.prices.betterFood.wood = game.prices.betterFood.wood*5;
        updateUpgrades()
        chechIfPurchaseable()
        } else {
            console.log('not enought resources');
        }
    });
    $('#sausages').on('click', 'input', function(event) {
        if( game.gold >= game.prices.sausages.gold && game.wood >= game.prices.sausages.wood && game.food >= game.prices.sausages.food)  {
        game.gold = game.gold-game.prices.sausages.gold;
        game.wood = game.wood-game.prices.sausages.wood;
        game.food = game.food-game.prices.sausages.food;

        game.prices.sausages.gold = game.prices.sausages.gold*13;
        game.prices.sausages.food = game.prices.sausages.food*13;
        game.prices.sausages.wood = game.prices.sausages.wood*13;
        if(game.space>game.population) game.population = parseInt(game.population/8+game.population);
        updateUpgrades()
        chechIfPurchaseable()
        } else {
            console.log('not enought resources');
        }
    });

    $('#woodMaker').on('click', 'input', function(event) {
        if( game.gold >= game.prices.woodMaker.gold && game.wood >= game.prices.woodMaker.wood && game.food >= game.prices.woodMaker.food)  {
        game.gold = game.gold-game.prices.woodMaker.gold;
        game.wood = game.wood-game.prices.woodMaker.wood;
        game.food = game.food-game.prices.woodMaker.food;

        game.prices.woodMaker.gold = game.prices.woodMaker.gold*13;
        game.prices.woodMaker.food = game.prices.woodMaker.food*13;
        game.prices.woodMaker.wood = game.prices.woodMaker.wood*13;
        game.workers.wood = (game.workers.wood+1)*2
        updateUpgrades()
        chechIfPurchaseable()
        $('.structureplace').append('<div class="segheria"></div>');
        } else {
            console.log('not enought resources');
        }
    });

    $('#foodMaker').on('click', 'input', function(event) {
        if( game.gold >= game.prices.foodMaker.gold && game.wood >= game.prices.foodMaker.wood && game.food >= game.prices.foodMaker.food)  {
        game.gold = game.gold-game.prices.foodMaker.gold;
        game.wood = game.wood-game.prices.foodMaker.wood;
        game.food = game.food-game.prices.foodMaker.food;

        game.prices.foodMaker.gold = game.prices.foodMaker.gold*13;
        game.prices.foodMaker.food = game.prices.foodMaker.food*13;
        game.prices.foodMaker.wood = game.prices.foodMaker.wood*13;
        game.workers.food = (game.workers.food+1)*2
        updateUpgrades()
        chechIfPurchaseable()
        $('.structureplace').append('<div class="fattoria"></div>');
        } else {
            console.log('not enought resources');
        }
    });

     $('#goldMaker').on('click', 'input', function(event) {
        if( game.gold >= game.prices.goldMaker.gold && game.wood >= game.prices.goldMaker.wood && game.food >= game.prices.goldMaker.food)  {
        game.gold = game.gold-game.prices.goldMaker.gold;
        game.wood = game.wood-game.prices.goldMaker.wood;
        game.food = game.food-game.prices.goldMaker.food;

        game.prices.goldMaker.gold = game.prices.goldMaker.gold*13;
        game.prices.goldMaker.food = game.prices.goldMaker.food*13;
        game.prices.goldMaker.wood = game.prices.goldMaker.wood*13;
        game.workers.gold = (game.workers.gold+1)*2
        updateUpgrades()
        chechIfPurchaseable()
        $('.structureplace').append('<div class="miniera"></div>');
        } else {
            console.log('not enought resources');
        }
    });
    $('#toggleImprovements').on('click', function(event) {
       $('#improvements').toggleClass('opened');
    });

    $('#improvements').on('click', 'label[for]', function(event) {
        if($(this).closest('div').attr('class')=='opened') {
            $(this).closest('div').removeClass('opened');
            //console.log('opened')
        }

    });


});



