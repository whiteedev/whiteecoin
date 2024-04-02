let counter = (localStorage.getItem('counter')) ? parseInt(localStorage.getItem('counter')) : 0;
let factor  = 1;
let background = 0;

document.querySelector('#button').addEventListener('click', function()
{
    counter += factor;
    document.querySelector("#counter").textContent = parseInt(counter);

    let vfx = document.querySelector(".button-vfx");
    vfx.style.backgroundImage = 'url("./img/buttonVfx.gif")';
    setTimeout (function() {
        vfx.style.backgroundImage = 'unset';
    }, 100);
    saveMain();
});



class Bonus
{
    constructor(name, cost, factor, id, automate, own = 0)
    {
        this.name = name;
        this.cost = cost;
        this.factor = factor;
        this.own = 0;
        this.id = id;
        this.automate = automate;

        let tags = '<div class="'+this.id+' bonus" href="#"> <div class="bunus-vfx"></div> <h2>'+this.name+'</h2> <p> ИМЕЕТСЯ: <span class="multiply_counter">'+this.own+'</span> </p> <p> ЦЕНА: <span class="multiply_cost">'+this.cost+'</span> </p> </div>';
        document.querySelector(".b-three").innerHTML += tags;

        this.element = document.querySelector("."+this.id);

        if (this.automate == true)
        {
            setInterval(() =>
            {
                counter += background;
                this.refresh();
            }, 1 * 1000);
        }

        for (let i = 0; i < own; i++)
        {
            this.buy(true);
        }
    }

    buy(instant = false)
    {
        if (counter >= this.cost || instant)
        {
            if (this.automate)
                background += this.factor;
            else
                factor += this.factor;




            if (!instant)
            {
                counter -= this.cost;
                this.animation();
            }


            this.own += 1;
            this.factor += 0.1;
            this.cost *= 1.5;
            this.refresh();

            localStorage.setItem(this.id, this.own);
        }
    }

    refresh()
    {
        document.querySelector("."+this.id+" .multiply_counter").textContent = (this.own).toFixed(0);
        document.querySelector("."+this.id+" .multiply_cost").textContent = (this.cost).toFixed(0);
        //document.querySelector("."+this.id+" .multiply_factor").textContent = (this.factor).toFixed(1);
        document.querySelector("#counter").textContent = parseInt(counter);
        document.querySelector("#factor").textContent = factor.toFixed(1);
        document.querySelector("#background").textContent = background.toFixed(0);
    }

    listener()
    {
        document.querySelector("."+this.id).addEventListener('click', () => { this.buy(); });
    }

    animation()
    {
        let vfx = document.querySelector("."+this.id).querySelector(".bunus-vfx");
        vfx.style.backgroundImage = 'url("./img/bonusVfx.gif")';
        setTimeout (function() {
            vfx.style.backgroundImage = 'unset';
        }, 100);
    }
}

// (name, cost, factor, id, automate~)
let one = new Bonus('Улучшить клик', 1, 0.1, 'one', false, (localStorage.getItem('one')) ? parseInt(localStorage.getItem('one')) : 0);
let one1 = new Bonus('Автоматическая добывалка', 150000, 1, 'two', true, (localStorage.getItem('one')) ? parseInt(localStorage.getItem('one')) : 0);


one.listener();
one1.listener();


function saveMain() {
    localStorage.setItem('counter', parseInt(counter));
}

setInterval(saveMain, 1000);
