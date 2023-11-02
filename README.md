# sentry
## The running process is generally:  
1. Select the role to enter the page:
   console.log('1111') => onRegisterSentry()(This step includes: addIntegration?.(replay)) => onIdentify() => onStartReplay()
   
   ![image](https://github.com/Zero-ruan/sentry/assets/67668275/c03d0fa4-f7dc-4194-bdde-9a20a4ced34f)

2. After switching roles: onStopReplay() => console.log('change role') => onIdentify() => onIdentify() => onStartReplay()
   
   ![image](https://github.com/Zero-ruan/sentry/assets/67668275/7305a591-df1a-4eaf-ab98-e9386f9c242b)

## issue 
1. Without using replay.setupOnce() and using replay.stop() and then executing replay.start(), I don't see the replay being generated when I create an error on the page. but using replay.setupOnce() and then executing replay.start() everything works fine!
2. I used replaysSessionSampleRate: 0 and startBuffer, but when I create an 'ApolloError: Response not successful: Received status code 400' error' to generate a replay, and then switch roles (start a new replay), create this type again The error will not generate a replay, but if other types of errors are made at this time, such as (xxx is not a function), the replay will be generated normally. I think that when replaysSessionSampleRate is 0, the same type of error will only be recorded once, because I use replaysSessionSampleRate : 1, two replays of the same type of error will be generated.
