function simpson(f, a, b, n){
    let h = (b - a) / n;

    let integral = 0;

    for (let i = 0; i <= n; i++){
        let val = f(a + i * h);
        if (i == 0 || i == n)
            integral += val;
        else if (i % 2 == 0)
            integral += 2 * val;
        else if (i % 2 == 1)
            integral += 4 * val;
    }

    integral = (h * integral) / 3;

    return integral;
}

function normal_pdf(x){
    return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
}

function normal_cdf(x){
    if (x == 0)
        return 0.5;
    else if (x > 100)
        return 1.0;
    else if (x < -100)
        return 0.0;
    else if (x < 0)
        return 1.0 - normal_cdf(-x);
    else{
        let n = Math.round(x / 1e-6);
        if (n % 2 == 1)
            n = n + 1;

        return simpson(normal_pdf, 0, x, n) + 0.5;
    }
}

function bisection_search_normal(y){
    if (y <= 0 || y >= 1)
        return NaN;
    else{
        let a = -100;
        let b = 100;
        while (true){
            let s_y = normal_cdf((a + b) / 2);
            console.log(a, b, s_y);
            if (Math.abs(s_y - y) <= 1e-5)
                return (a + b) / 2;
            else if (s_y > y)
                b = (a + b) / 2; 
            else if (s_y < y)
                a = (a + b) / 2;
        }
    }
}