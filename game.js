var faceRight = false
var faceLeft = false
var win = false;
class Intro extends Phaser.Scene{
    constructor(){
        super('Intro')
    } 
    preload(){
        this.load.path = './assets/';
        this.load.image('start', 'Start.png');
    }
    create(){
        let button = this.imageObject = this.add.image(
            450,
            200,
            'start',
        )
        this.imageObject.setScale(3);
        this.emphasize(button, 3);
        button.on('pointerdown', () =>
        {
            this.add.tween({
                targets: button,
                alpha: {from: 1, to: 0},
                duration: 200
            })
            let instruction = this.add.text(120,120,"Get the Gold!", {fontSize: 85, fill: '#fff2cc'});
            instruction.alpha = 0;
            this.time.delayedCall(250, () => this.add.tween({
                targets: instruction,
                alpha: {from: 0, to: 1},
                duration: 200
            }))
            this.time.delayedCall(1050, () => this.add.tween({
                targets: instruction,
                alpha: {from: 1, to: 0},
                duration: 200
            }))
            this.time.delayedCall(1350, () => this.scene.start('level1'))
            //this.scene.start('level1')
        })

    }emphasize(item, num1){
        item.setInteractive()
        item.on('pointerover', () => {
            item.setInteractive()
        this.add.tween({
            targets: item,
            scale: {from: num1, to: num1 + 1},
            duration: 100
        })
        item.on('pointerout', () => {
            this.add.tween({
                targets: item,
                scale: {from: num1 + .04, to: num1},
                duration: 1
            })
        })
    
    });}
}



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
        this.add.text(50,50,"← to move to the left", {fontSize: 25, fill: '#fff2cc'});
        this.add.text(50,80,"→ to move to the right", {fontSize: 25, fill: '#fff2cc'});
        this.add.text(50,110,"↑ to jump", {fontSize: 25, fill: '#fff2cc'});
        this.add.text(50,140,"spacebar to open mouth", {fontSize: 25, fill: '#fff2cc'});
        //←→↑
        this.imageObject = this.add.image(
            400,
            435,
            'fakeFloor',
        )
        this.imageObject.setScale(1);
        this.imageObject = this.add.image(
            600,
            260,
            'fakeGround',
        )
        this.imageObject.setScale(1.3);

        const goal = this.physics.add.staticGroup();
        
        const platforms = this.physics.add.staticGroup();

        let worldFloor = platforms.create(400, 480, 'floor').setScale(2).refreshBody();
        var normalFloor = platforms.create(600, 300, 'ground');
       // platforms.create(50, 250, 'ground');
       goal.create(730, 240, 'gold')

        this.player = this.physics.add.sprite(100, 400, 'Mon');


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
            win = false;
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
        }else{
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
        create(){
            let instruction = this.add.text(120,120,"Get more Gold!", {fontSize: 85, fill: '#fff2cc'});
            instruction.alpha = 0;
            this.time.delayedCall(250, () => this.add.tween({
                targets: instruction,
                alpha: {from: 0, to: 1},
                duration: 200
            }))
            this.time.delayedCall(1050, () => this.add.tween({
                targets: instruction,
                alpha: {from: 1, to: 0},
                duration: 200
            }))
            this.time.delayedCall(1250, () => this.scene.start('level2'))
        }
    }




class Level2 extends Phaser.Scene{
    constructor() {
        super('level2')
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
        this.add.text(500,50,"← to move to the left", {fontSize: 25, fill: '#fff2cc'});
        this.add.text(500,80,"→ to move to the right", {fontSize: 25, fill: '#fff2cc'});
        this.add.text(500,110,"↑ to jump", {fontSize: 25, fill: '#fff2cc'});
        this.add.text(500,140,"spacebar to open mouth", {fontSize: 25, fill: '#fff2cc'});
        
        this.imageObject = this.add.image(
            400,
            450,
            'fakeFloor',
        )
        this.imageObject.setScale(1);
        this.imageObject = this.add.image(
            600,
            780,
            'fakeGround',
        )
        this.imageObject.setScale(1.3);

        const goal = this.physics.add.staticGroup();
        
        const platforms = this.physics.add.staticGroup();


        platforms.create(400, 490, 'floor').setScale(1).refreshBody();
        platforms.create(700, 330, 'ground').setScale(.7).refreshBody();
        platforms.create(100, 230, 'ground').setScale(.7).refreshBody();
       // platforms.create(50, 250, 'ground');
       goal.create(100, 185, 'gold').setScale(.7).refreshBody();


        this.player = this.physics.add.sprite(100, 400, 'Mon').setScale(1);


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
            this.scene.start('between2and3')
            win = false;
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
        win = true
    }

    }



    class Afterlevel2 extends Phaser.Scene{
        constructor() {
            super('between2and3')
        }
        create(){
            let instruction = this.add.text(120,120,"Get even more Gold!", {fontSize: 55, fill: '#fff2cc'});
            instruction.alpha = 0;
            this.time.delayedCall(250, () => this.add.tween({
                targets: instruction,
                alpha: {from: 0, to: 1},
                duration: 200
            }))
            this.time.delayedCall(1050, () => this.add.tween({
                targets: instruction,
                alpha: {from: 1, to: 0},
                duration: 200
            }))
            this.time.delayedCall(1350, () => this.scene.start('level3'))
        }
    }




    class Level3 extends Phaser.Scene{
        constructor() {
            super('level3')
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
            this.add.text(30,30,"← to move to the left", {fontSize: 25, fill: '#fff2cc'});
            this.add.text(30,60,"→ to move to the right", {fontSize: 25, fill: '#fff2cc'});
            this.add.text(30,90,"↑ to jump", {fontSize: 25, fill: '#fff2cc'});
            this.add.text(30,120,"spacebar to open mouth", {fontSize: 25, fill: '#fff2cc'});
            //←→↑
            this.imageObject = this.add.image(
                400,
                470,
                'fakeFloor',
            )
            this.imageObject.setScale(.6);

            const goal = this.physics.add.staticGroup();
            
            const platforms = this.physics.add.staticGroup();
    
    
            platforms.create(450, 490, 'floor').setScale(.6).refreshBody();
            //platforms.create(850, 330, 'ground').setScale(.2);
            platforms.create(300, 300, 'ground').setScale(.3).refreshBody();
            platforms.create(100, 400, 'ground').setScale(.3).refreshBody();
            platforms.create(400, 400, 'ground').setScale(.3).refreshBody();
            platforms.create(460, 180, 'ground').setScale(.3).refreshBody();
            platforms.create(800, 180, 'ground').setScale(.3).refreshBody();
          
           goal.create(800, 160, 'gold').setScale(.4).refreshBody();
    
    
            this.player = this.physics.add.sprite(50, 420, 'Mon').setScale(.5);
    
    
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
                this.scene.start('after3')
                win = false;
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
                this.player.setVelocityY(-350);
            }
        }
    
        ifWin (player, goal)
        {
            win = true
        }
    
        }


        class Afterlevel3 extends Phaser.Scene{
            constructor() {
                super('after3')
            }
            create(){
                let instruction = this.add.text(120,120,"You Win!", {fontSize: 85, fill: '#fff2cc'});
                instruction.alpha = 0;
                this.time.delayedCall(250, () => this.add.tween({
                    targets: instruction,
                    alpha: {from: 0, to: 1},
                    duration: 200
                }))
                
                //this.scene.start('level3')
                let prompt = this.add.text(120,280,"Press to Play Again?", {fontSize: 55, fill: '#fff2cc'});
                prompt.alpha = 0;
                this.time.delayedCall(850, () => this.add.tween({
                    targets: prompt,
                    alpha: {from: 0, to: 1},
                    duration: 200
                }))
                prompt.setInteractive()
                prompt.on('pointerdown', () => {
                    this.scene.start('Intro')
                })
            }
        }

        
    const config = {
        type: Phaser.AUTO,
        width: 900, 
        height: 500, 
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 500 },
                debug: false
            }
        },
        scene: [ Intro, Level2, Level3, Level1, Afterlevel1, Afterlevel2, Afterlevel3]
    };
    
    const game = new Phaser.Game(config);
    
