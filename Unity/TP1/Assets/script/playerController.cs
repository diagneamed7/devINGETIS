using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class NewBehaviourScript : MonoBehaviour
{
    public Rigidbody rb;
    public int speed = 10;
    private int count;
    public Text countText;
    // Start is called before the first frame update
    void Start()
    {
        count = 0;
        SetCountText();
        rb = GetComponent<Rigidbody>();   
    }

    // Update is called once per frame
    void FixedUpdate()
    {
        //fléche (à droite, à gauche) = (-1 , 1)
        //fléche (haut et bas ) = (-1 , 1)
        float mouveHorizontal = Input.GetAxis("Horizontal");
        float mouveVertical = Input.GetAxis("Vertical");

        Vector3 mouvement = new Vector3(mouveHorizontal, 0, mouveVertical);
        rb.AddForce(mouvement * speed * Time.deltaTime);
    }
    void OnTriggerEnter(Collider other)
    {
        if (other.gameObject.tag == "cube")
        {
            other.gameObject.SetActive(false);
            count = count + 1;
        }
    }

    void SetCountText()
    {
        countText.text = "Cubes : " + count.ToString();
    }
}
