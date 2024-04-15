console.log("Server started");
process.stdin.on('readable', ()=>{
    const input = process.stdin.read().toString();
    if (input.trim() === 'exit')
        process.exit(0);
    else
        process.stdout.write(input);
});