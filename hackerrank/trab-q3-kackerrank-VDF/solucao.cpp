#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
  
  
int tijolos[26];
int dp[1000001];
 
//estrutura de programação dinâmica. Esse problema é idêntico ao problema do troco, por isso, utilizamos a mesma estrutura recursiva
int dp_tijolos(int v,int n)
{

    dp[0]=0;
    int aux;
    for(int i=1;i<=v;i++)
    {
        aux = 10000001;
        for(int j=1;j<=n;j++)
        {
			
            if(tijolos[j]<=i)
            aux=min(aux,dp[i-tijolos[j]]);
             
        }
        dp[i] = aux+1;
    }
    return dp[v];
}
 
 
int main() {
    int t,a,b,i,j;
    cin>>t;
    for(i=1;i<=t;i++){
        cin>>a>>b;
        for( j=1;j<=a;j++)
        {
            cin>>tijolos[j];
        }
        
        cout<<dp_tijolos(b,a)<<endl;
         
          
          
    }
    return 0;
}