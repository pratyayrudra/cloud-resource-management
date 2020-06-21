# Cloud Resource Management
> This is for educational purpose only

## Introduction
Cloud computing is a technology that provides Information Technology as a service to its users. The clients/users can access the services from cloud environment through the internet and remote servers. Due to scarcity and large cost of cloud resources there is need for proper scheduling and allocation of cloud resources. The cloud resources must be allocated in efficient and effective way so that total cost of resources should be minimized. The cloud resources must be utilized in energy efficient methods. Scheduling algorithms are used for dispatching user tasks or jobs to a particular resource or data. [[1]](#1)

## Objective
In this project we have implemented an algorithm into a working program. The goals are:
- Minimize the number of serves used by migrating load of one server to another server then saves the energy as only required servers are active and remaining servers are not active. [[2]](#1)
- Maximize the resource utilization by giving services to new clients from the previously deallocated servers instead of starting the new sever for new requests, thereby saving the energy. [[3]](#1)
- Schedule the client requests into multilayer jobs categories - critical, moderate and normal. The critical tasks are scheduled on fast servers so services are quick and less critical tasks are scheduled on moderate servers. [[4]](#1)
#### ```Algorithm :- ``` 
1. Priorities the servers according to their capabilities. The server with best capabilities are given priority 1, the servers with some less capabilities are given priority 2 and so on.
2. Accept ClientID, No. of jobs and processing tie for each jobs requested.
3. Start the scheduling & categorize them into three layers - critical, moderate and normal tasks according to the completion time required for each jobs.
4. Depending upon the capabilities (priorities) of cloud servers scheduler allocate the requests to particular server.
5. If some high priority servers are overloaded due to heavy load of critical tasks then their load is migrated to another server of same priority.
6. If some servers are under loaded then their jobs are migrated to a nearest server of same priority having sufficient capacity.
7. Exit. [[5]](#1)
## Getting Started
To clone and run this application, you'll need [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com/)) installed on your computer. From your command line:
```

# Clone this repository
$ git clone https://github.com/pratyayrudra/cloud-resource-management.git

# Go into the repository
$ cd cloud-resource-management

```

## Setup
> You can use the default values and test cases
### Server Setup :- 
To modify the no of servers or the capacity of the servers you need to edit this file ```resources/SERVER.JS```
Each server must have : 
- **id** ( unique for each server. Example: h1 for high priority server 1)
- **jobs** (no of jobs the server is capable of handling)
- **process** (this array will hold the active process no during execution)
### Test Cases :-
To modify the test case or emulate more client requests you need to edit this file ```tests/Requests.json```
Each test case must have :
- **clientID** (must be unique)
- **jobs** (no of jobs to be requested to the server)
- **time** (processing time in ***ms***)
According to the time: 
		- Less than **1000** (critical priority task)
		- Between **1000 and 5000** (moderate priority task)
		- Above **5000** (low priority task)
	
## Usage

##### How to run the program?
```

# Run the program
$ node index.js

# Logs will be shown here

```

##### Default Test Cases Logs
```

[ALLOCATION] Process PRO001 of HIGH priority allocated to h0
[SERVER] {"id":"h0","jobs":20,"process":["PRO001"]}
[ALLOCATION] Process PRO002 of HIGH priority allocated to h1    
[SERVER] {"id":"h1","jobs":60,"process":["PRO002"]}
[ALLOCATION] Process PRO003 of MODERATE priority allocated to m0
[SERVER] {"id":"m0","jobs":0,"process":["PRO003"]}
[ALLOCATION] Process PRO004 of MODERATE priority allocated to m1
[SERVER] {"id":"m1","jobs":30,"process":["PRO004"]}
[ALLOCATION] Process PRO005 of HIGH priority allocated to h0    
[SERVER] {"id":"h0","jobs":10,"process":["PRO001","PRO005"]}    
[ALLOCATION] Process PRO006 of MODERATE priority allocated to m1
[SERVER] {"id":"m1","jobs":10,"process":["PRO004","PRO006"]}    
[ALLOCATION] Process PRO007 of LOW priority allocated to l0     
[SERVER] {"id":"l0","jobs":25,"process":["PRO007"]}
[SCHEDULER] Process not allocated for 008 waiting
[ALLOCATION] Process PRO009 of LOW priority allocated to l0     
[SERVER] {"id":"l0","jobs":5,"process":["PRO007","PRO009"]}     
[ALLOCATION] Process PRO010 of LOW priority allocated to l1     
[SERVER] {"id":"l1","jobs":0,"process":["PRO010"]}
[DEALLOCATION] Process PRO002 of HIGH priority deallocated from h1
[SERVER] {"id":"h1","jobs":100,"process":[]}     
[SCHEDULER] Trying again with waiting process    
[SCHEDULER] Process not allocated for 008 waiting
[DEALLOCATION] Process PRO001 of HIGH priority deallocated from h0
[SERVER] {"id":"h0","jobs":90,"process":["PRO005"]}
[SCHEDULER] Trying again with waiting process      
[SCHEDULER] Process not allocated for 008 waiting  
[DEALLOCATION] Process PRO005 of HIGH priority deallocated from h0
[SERVER] {"id":"h0","jobs":100,"process":[]}     
[SCHEDULER] Trying again with waiting process    
[SCHEDULER] Process not allocated for 008 waiting
[DEALLOCATION] Process PRO004 of MODERATE priority deallocated from m1
[SERVER] {"id":"m1","jobs":50,"process":["PRO006"]}
[SCHEDULER] Trying again with waiting process
[ALLOCATION] Process PRO008 of MODERATE priority allocated to m1
[SERVER] {"id":"m1","jobs":0,"process":["PRO006","PRO008"]}     
[DEALLOCATION] Process PRO003 of MODERATE priority deallocated from m0
[SERVER] {"id":"m0","jobs":70,"process":[]}      
[MIGRATION] Process PRO006 migrated from m1 to m0
[MIGRATION] Process PRO008 migrated from m1 to m0
[DEALLOCATION] Process PRO006 of MODERATE priority deallocated from m0
[SERVER] {"id":"m0","jobs":20,"process":[]}
[DEALLOCATION] Process PRO008 of MODERATE priority deallocated from m0
[SERVER] {"id":"m0","jobs":70,"process":[]}
[DEALLOCATION] Process PRO007 of LOW priority deallocated from l0
[SERVER] {"id":"l0","jobs":10,"process":["PRO009"]}
[DEALLOCATION] Process PRO010 of LOW priority deallocated from l1
[SERVER] {"id":"l1","jobs":30,"process":[]}
[DEALLOCATION] Process PRO009 of LOW priority deallocated from l0
[SERVER] {"id":"l0","jobs":30,"process":[]}

```

## References
<a id="1">[1][2][3][4][5]</a>
- [Towards energy efficient multi layer job scheduling approach over a cloud network](https://ieeexplore.ieee.org/document/8392116)

## License
MIT