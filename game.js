var faceRight = false
var faceLeft = false
var win = false;
class Level1 extends Phaser.Scene{
    constructor() {
        super('level1')
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('floor', 'solidFloor.png');
        this.load.image('ground', 'solidGround.png');
        this.load.image('fakeFloor', 'floor.png');
        this.load.image('fakeGround', 'ground.png');
        this.load.image('gold', 'Gold.png');
        this.load.spritesheet('Mon', 'monSpriteSheet.png', {
            frameWidth: 213,
            frameHeight: 117,
        
        });
        this.load.spritesheet('Fire', 'flamesSheet.png', {
            frameWidth: 53,
            frameHeight: 25,
        
        });
    }
    create(){
        this.imageObject = this.add.image(
            400,
            520,
            'fakeFloor',
        )
        this.imageObject.setScale(1);
        this.imageObject = this.add.image(
            600,
            360,
            'fakeGround',
        )
        this.imageObject.setScale(1.3);

        const goal = this.physics.add.staticGroup();
        
        const platforms = this.physics.add.staticGroup();

        goal.create(400, 500, 'gold')

        let worldFloor = platforms.create(400, 568, 'floor').setScale(2).refreshBody();
        var normalFloor = platforms.create(600, 400, 'ground');
       // platforms.create(50, 250, 'ground');


        this.player = this.physics.add.sprite(100, 450, 'Mon');



        //here
        //here
        //here
        this.physics.add.overlap(this.player, goal, this.ifWin, null, this)





        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: [ { key: 'Mon', frame: 0 } ],
            frameRate: 10
        });

        this.anims.create({
            key: 'right',
            frames: [ { key: 'Mon', frame: 2 } ],
            frameRate: 10
        });

        this.anims.create({
            key: 'leftRoar',
            frames: [ { key: 'Mon', frame: 1 } ],
            frameRate: 10
        });
        this.anims.create({
            key: 'rightRoar',
            frames: [ { key: 'Mon', frame: 3 } ],
            frameRate: 10
        });


        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player, platforms);
        this.physics.add.collider(this.player, goal);
        this.physics.add.collider(goal, platforms);
        

    }
    
    update(){
        if(win == true){
            console.log('end of game');
            this.scene.start('between1and2')
        }


        const { left, right, up, } = this.cursors;
        const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        const downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        if (left.isDown)
        {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);

            faceLeft = true
            faceRight = false
            if(spaceKey.isDown){
                if(faceLeft == true){
                    this.player.anims.play('leftRoar', true);
                }else if (faceRight == true){
                    this.player.anims.play('rightRoar', true);
                }else{
                    this.player.anims.play('leftRoar', true);
                }}
        }
        else if (right.isDown)
        {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);

            faceRight = true
            faceLeft = false
            if(spaceKey.isDown){
                if(faceLeft == true){
                    this.player.anims.play('leftRoar', true);
                }else if (faceRight == true){
                    this.player.anims.play('rightRoar', true);
                }else{
                    this.player.anims.play('leftRoar', true);
                }}
        }else if(spaceKey.isDown){
            if(faceLeft == true){
                this.player.anims.play('leftRoar', true);
            }else if (faceRight == true){
                this.player.anims.play('rightRoar', true);
            }else{
                this.player.anims.play('leftRoar', true);
            }
        }
        else
        {
            if(faceLeft == true){
            this.player.setVelocityX(0);

            this.player.anims.play('left');
        }else if(faceRight == true){
            this.player.setVelocityX(0);

            this.player.anims.play('right');
        }else{
            this.player.setVelocityX(0);

            this.player.anims.play('left');
        }

        }

        if (up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-450);
        }
    }

    ifWin (player, goal)
    {
        console.log('you win')
        win = true
    }

    }


    class Afterlevel1 extends Phaser.Scene{
        constructor() {
            super('between1and2')
        }
        preload(){
            this.load.image('fakeFloor', 'floor.png');
        }
        create(){
            this.imageObject = this.add.image(
                400,
                520,
                'fakeFloor',
            )
        }
    }



    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 500 },
                debug: false
            }
        },
        scene: [Level1, Afterlevel1]
    };
    
    const game = new Phaser.Game(config);
    
