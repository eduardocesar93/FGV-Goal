#include <iostream>
#include <cmath>

using namespace std;
static int g[26][26];
static int lbl[26];

//DFS
void encontra(int v,int b)
{
  lbl[v]=1;
  for(int i=0;i<b;i++)
  {
     if(g[v][i]==1 && lbl[i]==0)
     {
                     encontra(i,b);
     }

  }

}

 
//chama o dfs
void acha_caminho(int v,int b)

{
  int i;
  for(i=0;i<b;i++)
  {             
    lbl[i]=0;
  }
  encontra(v,b);          
}

int main() {
  int a,b,t,i,j,k,ja_foi[26],ja_e[26],cont,verif=0;
  char resp;
  char valor1,valor2;
  cin>>t;
  for(i=1;i<=t;i++)
  {             	
     cout<<"Caso #"<<i<<":"<<endl;
     cont=0;
     cin>>a>>b;
     for(j=0;j<26;j++)
     {
       for(k=0;k<26;k++)
       {
         g[k][j]=0;
         ja_foi[k]=0;
         ja_e[k]=0;
       }
     }
     for(j=1;j<=b;j++)
     {
       cin>>valor1>>valor2;
       g[valor1%97][valor2%97]=1;
       g[valor2%97][valor1%97]=1;                                             
     }
     //percorrer todos os nós, se foi visitado alguma vez, pulo pro próximo. No inicio, nenhum foi visitado
     for(j=0;j<a;j++)
     {                                                                           
        //se não foi visitado
       if(ja_foi[j]==0)
       {
          verif=1;
          cont++;
          acha_caminho(j,a);
          //verifico no dfs quais já foram visitados
          for( k=0;k<a;k++)
          {
            if(lbl[k]==1)
              ja_foi[k]=1;
          }                                                                            

       }
       for( k=0;k<a;k++)
      {                                                                                            
         //vejo quem foi visitado nessa rodada. Formam mais um componente conexo
          if(ja_foi[k]!=ja_e[k])
          {
          				
            resp = k+97;
            ja_e[k]=1;
            cout<<resp<<",";
          }
      }
       if(verif==1)
       {
        cout<<endl;
        verif=0;
       }                                                                                                                     
     }
     cout<<cont<<" componentes conectados"<<endl<<endl;                                                            
  }

return 0;
}