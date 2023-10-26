# sentry
## The running process is generally:  
1. Select the role to enter the page:
   console.log('1111') => onRegisterSentry()(This step includes: addIntegration?.(replay)) => onIdentify() => onStartReplay()
   
   ![image](https://github.com/Zero-ruan/sentry/assets/67668275/c03d0fa4-f7dc-4194-bdde-9a20a4ced34f)

2. After switching roles: onStopReplay() => console.log('change role') => onIdentify() => onIdentify() => onStartReplay()
   
   ![image](https://github.com/Zero-ruan/sentry/assets/67668275/7305a591-df1a-4eaf-ab98-e9386f9c242b)

## issue 
1. Without using replay.setupOnce() and using replay.stop() and then executing replay.start(), I don't see the replay being generated when I create an error on the page. but using replay.setupOnce() and then executing replay.start() everything works fine!
2. Refreshing will perform the first step above again, resulting in the generation of a replay without errors
